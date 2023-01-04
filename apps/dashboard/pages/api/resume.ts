import { HackformResumeUploadClient } from '@hibiscus/hackform-client';
import { LocalAPIResponses } from '../../common/types';
import { NextApiHandler } from 'next';
import { container } from 'tsyringe';

const handler: NextApiHandler = async (req, res) => {
  const file = req.body.file as File;
  const key = req.body.key as string;

  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const uploadClient = container.resolve(HackformResumeUploadClient);

  try {
    const r = await uploadClient.uploadResume(file, key);
    return res
      .status(200)
      .json({ key, meta: r } as LocalAPIResponses['/resume']);
  } catch (e) {
    console.error(e);
    // TODO: better handling
    res.status(500).json({ msg: 'Something went wrong', e });
  }
};

export default handler;
