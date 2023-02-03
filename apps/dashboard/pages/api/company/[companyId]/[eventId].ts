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
  try {
    const { companyId, eventId } = req.query;
    const stringifyCompanyId = companyId.toString();
    const stringifyEventId = eventId.toString();
    const repo = container.resolve(AttendeeRepository);

    if (req.method === 'GET') {
      const currentEventInfo = await repo.getEventInfo(stringifyEventId);
      if (currentEventInfo.data['company_id'] !== stringifyCompanyId) {
        return res
          .status(404)
          .json({ message: 'Requested resource not found' });
      }

      //get all attendees related to eventId
      const eventResult = await repo.getAttendeesByEventId(stringifyEventId);
      if (!eventResult.data) {
        return res
          .status(404)
          .json({ message: 'Requested resource not found' });
      }
      const attendeesData: any[] = processAttendeesList(
        eventResult.data,
        stringifyCompanyId
      );
      return res.status(200).json({ data: attendeesData });
    } else if (req.method === 'POST') {
      const yearFilter = req.body.year;
      const majorFilter = req.body.major;
      const schoolFilter = req.body.school;
      const savedFilter = req.body.saved;

      const currentEventInfo = await repo.getEventInfo(stringifyEventId);
      if (currentEventInfo.data['company_id'] !== stringifyCompanyId) {
        return res
          .status(404)
          .json({ message: 'Requested resource not found' });
      }

      //check if savedFilter is on or not
      //if is, use different repo call to grab all saved members info
      //if not, use getAllParticipants
      let eventResult: any;
      if (savedFilter) {
        eventResult = await repo.getAllSavedAttendees(stringifyCompanyId);
      } else {
        eventResult = await repo.getAttendeesByEventId(stringifyEventId);
      }

      if (!eventResult.data) {
        return res
          .status(404)
          .json({ message: 'Requested resource not found' });
      }

      let filteringArray: any[] = eventResult.data;
      const filterParams = ['graduation_year', 'major', 'school'];
      const filterValues = [yearFilter, majorFilter, schoolFilter];
      for (let i = 0; i < 3; i++) {
        if (!filteringArray.length) {
          break;
        }
        if (!filterValues[i]) {
          continue;
        }
        filteringArray = repo.filterAttendees(
          filterParams[i],
          filterValues[i].toLowerCase(),
          filteringArray
        );
      }

      const attendeesData: any[] = processAttendeesList(
        filteringArray,
        stringifyCompanyId
      );

      return res.status(200).json({ data: attendeesData });
    }
    return res.status(405).json({ message: 'Request not supported.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

function processAttendeesList(array: any[], companyId) {
  const attendeesData: any[] = [];

  array.map((element) => {
    //hardcoded since we are processing participants anyway
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
      participantData['school'],
      ''
    );
    attendeesData.push(attendee);
  });

  return attendeesData;
}
