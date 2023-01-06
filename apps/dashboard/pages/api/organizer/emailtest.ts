import { NextApiRequest, NextApiResponse } from 'next';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
// import individual service
import { getEnv } from '@hibiscus/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const env = getEnv();
  const ses = new SESClient({
    credentials: {
      accessKeyId: env.Hibiscus.AWS.accessKeyID,
      secretAccessKey: env.Hibiscus.AWS.secretAccessKey,
    },
    region: env.Hibiscus.AWS.region,
  });

  const to = 'benhwang@usc.edu';
  try {
    const cmd = new SendEmailCommand({
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Text: {
            Data: 'Test Hacksc Notification.',
          },
        },
        Subject: {
          Data: 'You have been invited to join HackSC',
        },
      },
      Source: 'no-reply@notifications.hacksc.com',
    });
    const data = await ses.send(cmd);
    console.debug(data);
    return res.status(200).json({ message: 'Invite sent successfully!' });
  } catch (e) {
    console.error(e);
    return res.status(500).json(e);
  }
}
