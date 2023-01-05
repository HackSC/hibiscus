import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).send('Method not allowed');
  const dir = path.join(process.cwd(), 'assets');
  const content = fs.readFileSync(dir + '/schools.csv', 'utf-8');
  const schools = content.split('\n');
  res.status(200).json(schools);
};

export default handler;
