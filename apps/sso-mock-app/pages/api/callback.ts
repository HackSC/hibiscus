import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  // Handle pre-flight requests
  if (req.method === 'OPTIONS') {
    if (req.headers.origin === process.env.SSO_URL) {
      res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type'
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(400).json({ message: 'Invalid request origin' });
    }
  } else if (req.method === 'POST') {
    const auth_header = req.headers.authorization;
    if (auth_header != null && auth_header.startsWith('Bearer ')) {
      const token = auth_header.substring('Bearer '.length);

      res.setHeader('Access-Control-Allow-Origin', process.env.SSO_URL);
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type'
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
      res.setHeader(
        'Set-Cookie',
        `${process.env.HIBISCUS_COOKIE_NAME}=${token}; Path=/; Max-Age=${process.env.HIBISCUS_COOKIE_MAX_AGE}; SameSite=None; HttpOnly; Secure`
      );
      res.status(200).json({
        message: 'Authorization success',
        redirect: process.env.SSO_MOCK_APP_URL,
      });
    } else {
      res.status(400).json({ error: 'Bearer token must be provided' });
    }
  } else {
    res
      .status(404)
      .json({ error: `HTTP method ${req.method} not supported on this route` });
  }
};

export default handler;
