import { DashboardRepository } from 'apps/dashboard/repository/DashboardRepository';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
// import entire SDK
import AWS from 'aws-sdk';
// import individual service
import S3 from 'aws-sdk/clients/s3';

export default async function invite(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const SESConfig = {
    apiVersion: '2010-12-01',
    accessKeyId: process.env.AWS_ACCESS_KEY,
    accessSecretKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_SES_REGION,
  };

  AWS.config.update(SESConfig);
  var ses = new AWS.SES();
  var maildata = {
    Destination: {
      ToAddresses: ['benhwang@usc.edu'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Test Hacksc Notification.',
        },
      },
      Subject: {
        Data: 'Hacksc Invite',
      },
    },
    Source: 'test@notifications.hacksc.com',
  };

  ses.sendEmail(maildata, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
  });

  return res.status(200).json({ message: 'Invite sent successfully!' });
}
