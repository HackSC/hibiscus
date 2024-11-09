import 'reflect-metadata';
import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import { ALLOWED_RESUME_FORMATS } from '../../../../../common/constants';
import mime from 'mime-types';
import {
  getTokensFromNextRequest,
  rateLimitHandler,
} from '../../../../../common/utils';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// validates via mimetype
const validateFormat = (file: formidable.File) => {
  return ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).includes(
    file.mimetype
  );
};

const hbc = container.resolve(HibiscusSupabaseClient);
hbc.setOptions({ useServiceKey: true });

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const { userId } = req.query;
  const userIdString = userId as string;

  if (!userIdString) {
    return res.status(400).json({ message: 'Unauthorized' });
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
        description: `We only accept these file extensions: ${ALLOWED_RESUME_FORMATS.join(
          ','
        )}`,
      });
    }

    const data = fs.readFileSync(file.filepath);
    const uploadClient = container.resolve(HackformResumeUploadClient);
    try {
      const checkExists = await uploadClient.resumeExists(userIdString);
      if (!checkExists) {
        const meta = await uploadClient.uploadResume(data, userIdString);
        await hbc
          .getClient()
          .from('participants')
          .update({ resume: meta.path })
          .eq('id', userIdString);
        return res.status(200).json({
          success: true,
          path: meta.path,
        });
      } else {
        const meta = await uploadClient.updateResume(data, userIdString);
        await hbc
          .getClient()
          .from('participants')
          .update({ resume: meta.path })
          .eq('id', userIdString);
        return res.status(200).json({
          success: true,
          path: meta.path,
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
