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

//one day this will need to handle duplicate attendees showing up in getAttendees from same users going to same company's events
//also one day will need to handle getEvents returning more than one event
//that's next year's problem
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(401).json({ message: 'Request not supported.' });
  }

  try {
    const { companyId, eventId } = req.query;
    const stringifyCompanyId = companyId.toString();
    const stringifyEventId = eventId.toString();
    const repo = container.resolve(AttendeeRepository);

    const currentEventInfo = await repo.getEventInfo(stringifyEventId);
    if (currentEventInfo.data['company_id'] !== stringifyCompanyId) {
      return res.status(404).json({ message: 'Requested resource not found' });
    }

    //get all attendees related to eventId
    const eventResult = await repo.getAttendeesByEventId(stringifyEventId);
    const attendeesData: any[] = [];
    eventResult.data.map((element) => {
      const participantData = element['participants'];
      const notes: any[] = participantData['notes'];
      //there never should be a case where there are more than one note from the same company for the same user
      const userNotes = notes
        .filter((ele) => {
          return ele['company_id'] === stringifyCompanyId;
        })
        .at(0);

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
        userNotes ? userNotes['note'] : null
      );
      attendeesData.push(attendee);
    });
    return res.status(200).json({ data: attendeesData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
