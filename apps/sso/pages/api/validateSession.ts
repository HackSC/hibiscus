import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const token = req.cookies[process.env.HIBISCUS_COOKIE_NAME];
    if (token != null) {
      const verifyRes = await fetch(`${process.env.SSO_URL}/api/verifyToken`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
      const { data } = await verifyRes.json();

      if (data.user != null) {
        res.status(200).json({ token });
        return;
      }
    }

    res.status(400).json({ error: 'No valid session found' });
  }
};

export default handler;
