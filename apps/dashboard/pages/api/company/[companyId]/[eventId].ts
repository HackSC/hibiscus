/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { AttendeeRepository } from '../../../../repository/attendee.repository';

function Attendee(
  id: string,
  fullName: string,
  major: string,
  resume: string,
  graduation_year: string,
  portfolio_link: string,
  school: string,
  quickNotes: string
) {
  this.id = id;
  this.full_name = fullName;
  this.major = major;
  this.resume = resume;
  this.graduation_year = graduation_year;
  this.portfolio_link = portfolio_link;
  this.school = school;
  this.quick_notes = quickNotes;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(401).json({ message: 'Request not supported.' });
  }

  try {
    const { companyId, eventId } = req.query;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stringifyCompanyId = companyId.toString();
    const stringifyEventId = eventId.toString();
    const repo = container.resolve(AttendeeRepository);

    //get all attendees related to eventId
    const eventResult = await repo.getUsersByEvent(stringifyEventId);
    const attendeesData: any[] = [];
    eventResult.data.map((element) => {
      const participantData = element['participants'];
      const notes: any[] = participantData['notes'];
      const userNotes = notes.filter((ele) => {
        if (ele['company_id'] == companyId) {
          return ele['note'];
        }
      });
      console.log(userNotes);
      console.log(notes);
      const attendee = new Attendee(
        participantData['id'],
        participantData['user_profiles']['first_name'] +
          ' ' +
          participantData['user_profiles']['last_name'],
        participantData['major'],
        participantData['resume'],
        participantData['graduation_year'],
        participantData['portfolio_link'],
        participantData['school'],
        participantData['notes']
      );
      attendeesData.push(attendee);
    });
    return res.status(200).json({ data: attendeesData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
