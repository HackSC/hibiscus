import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  // Handle pre-flight requests
  if (req.method === 'OPTIONS') {
    if (req.headers.origin === process.env.SSO_URL) {
      res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
      res.setHeader('Access-Control-Allow-Headers', 'Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(400).json({ message: 'Invalid request origin' });
    }
  } else if (req.method === 'GET') {
    const auth_header = req.headers.authorization;
    if (auth_header != null && auth_header.startsWith('Bearer ')) {
      const token = auth_header.substring('Bearer '.length);

      res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
      res.setHeader('Access-Control-Allow-Headers', 'Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
      res.setHeader(
        'Set-Cookie',
        `${process.env.NEXT_PUBLIC_HIBISCUS_COOKIE_NAME}=${token}; Path=/; Max-Age=86400`
      );
      res.status(200).json({
        message: 'Authorization success',
        redirect: process.env.SSO_MOCK_APP_URL,
      });
    } else {
      res.status(400).json({ error: 'Invalid authorization token' });
    }
  } else {
    res.status(400).json({ error: 'Authorization token not found' });
  }
};

export default handler;
