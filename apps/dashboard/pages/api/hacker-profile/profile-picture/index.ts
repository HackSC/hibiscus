import 'reflect-metadata';
import {
  HackFromProfilePictureClient,
} from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import { ALLOWED_PFP_FORMATS } from '../../../../common/constants';
import mime from 'mime-types';
import {
  getTokensFromNextRequest,
  rateLimitHandler,
} from '../../../../common/utils';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// validates via mimetype
const validateFormat = (file: formidable.File) => {
  return ALLOWED_PFP_FORMATS.map((it) => mime.lookup(it)).includes(
    file.mimetype
  );
};

const hbc = container.resolve(HibiscusSupabaseClient);
hbc.setOptions({ useServiceKey: true });

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }
  const { accessToken } = getTokensFromNextRequest(req);
  const user = await hbc.getUserProfile(accessToken);
  if (!user) {
    return res.status(400).json({ message: 'Unauthorized' });
  }
  if (user?.app_id !== null) {
    return res
      .status(400)
      .json({ message: 'You have already submitted your application!' });
  }

  try {
    await rateLimitHandler(req, res);
  } catch (e) {
    return res.status(429).send('Too many requests');
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
    const file = files.file as formidable.File;
    if (!file) {
      return res.status(400).json({ msg: 'No file detected; skipping upload' });
    }
    const key = fields.key as string;

    if (!validateFormat(file)) {
      return res.status(400).json({
        msg: 'Wrong format',
        description: `We only accept these file extensions: ${ALLOWED_PFP_FORMATS.join(
          ','
        )}`,
      });
    }
    const data = fs.readFileSync(file.filepath);
    const uploadClient = container.resolve(HackFromProfilePictureClient);
    try {
      const checkExist = await uploadClient.pfpExists(user.user_id);
      if (checkExist) {
        const response = await uploadClient.updatePfp(
          user.user_id,
          data,
          file.mimetype
        );
        return res.status(200).json({
          success: true,
          path: response.path,
        });
      } else {
        const response = await uploadClient.uploadPfp(
          user.user_id,
          data,
          file.mimetype
        );
        return res.status(200).json({
          success: true,
          path: response.path,
        });
      }
    } catch (e) {
      console.error(e);
      // TODO: better handling
      return res.status(500).json({ msg: 'Something went wrong' });
    }
  });
};

export default handler;
