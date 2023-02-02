import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { AttendeeRepository } from '../../../repository/attendee.repository';

//TODO: resume type will change. Resume integration not complete complete
function Attendee(
  id: string,
  fullName: string,
  major: string,
  resume: string,
  graduation_year: string,
  portfolio_link: string,
  school: string
) {
  this.id = id;
  this.full_name = fullName;
  this.major = major;
  this.resume = resume;
  this.graduation_year = graduation_year;
  this.portfolio_link = portfolio_link;
  this.school = school;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(401).json({ message: 'Request not supported.' });
  }

  try {
    const eventId: string = req.body.event_id;
    const repo = container.resolve(AttendeeRepository);

    //get all attendees related to eventId
    const eventResult = await repo.getUsersByEvent(eventId);
    console.log(eventResult.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attendeesData: any[] = [];
    eventResult.data.map((element) => {
      const participantData = element['participants'];
      const attendee = new Attendee(
        participantData['id'],
        participantData['user_profiles']['first_name'] +
          ' ' +
          participantData['user_profiles']['last_name'],
        participantData['major'],
        participantData['resume'],
        participantData['graduation_year'],
        participantData['portfolio_link'],
        participantData['school']
      );
      console.log(attendee);
      attendeesData.push(attendee);
    });
    return res.status(200).json({ data: attendeesData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
