import 'reflect-metadata';
import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { LocalAPIResponses } from '../../common/types';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import { ALLOWED_RESUME_FORMATS } from '../../common/constants';
import mime from 'mime-types';

export const config = {
  api: {
    bodyParser: false,
  },
};

// validates via mimetype
const validateFormat = (file: formidable.File) => {
  return ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).includes(
    file.mimetype
  );
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: 'Something went wrong' });
    }
    const file = files.file as formidable.File;
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
      const meta = await uploadClient.uploadResume(data, key);
      return res.status(200).json({
        key,
        filepath: file.filepath,
        meta,
      } as LocalAPIResponses['/resume']);
    } catch (e) {
      console.error(e);
      // TODO: better handling
      return res.status(500).json({ msg: 'Something went wrong', e });
    }
  });
};

export default handler;
