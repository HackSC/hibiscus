import { NextApiRequest, NextApiResponse } from 'next';
import {
  SESClient,
  CreateTemplateCommand,
  SendTemplatedEmailCommand,
  GetTemplateCommand,
} from '@aws-sdk/client-ses';
// import individual service
import { getEnv } from '@hibiscus/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const env = getEnv();
  console.log(env);
  const ses = new SESClient({
    credentials: {
      accessKeyId: env.Hibiscus.AWS.accessKeyID,
      secretAccessKey: env.Hibiscus.AWS.secretAccessKey,
    },
    region: env.Hibiscus.AWS.region,
  });

  var params = {
    Template: {
      TemplateName: 'InviteTemplate',
      SubjectPart: 'HackSC Invite From Team {{teamName}}',
      HtmlPart:
        '<h1>Hi {{name}},</h1><p>You have an invite to Team {{teamName}} from {{organizerName}}.</p>', //{{name}}
    },
  };

  try {
    const template = new CreateTemplateCommand(params);
    const response = await ses.send(template);
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }

  // const to = 'benhwang@usc.edu';
  // const teamName = 'Rocket'
  // try {
  //   const getTemplate = new GetTemplateCommand("InviteTemplate")
  //   const cmd = new SendTemplatedEmailCommand({
  //     Destination: {
  //       ToAddresses: [to],
  //     },
  //     Template: ,
  //     Source: 'no-reply@notifications.hacksc.com',
  //   });
  //   const data = await ses.send(cmd);
  //   console.debug(data);
  //   return res.status(200).json({ message: 'Invite sent successfully!' });
  // } catch (e) {
  //   console.error(e);
  //   return res.status(500).json(e);
  // }
}
