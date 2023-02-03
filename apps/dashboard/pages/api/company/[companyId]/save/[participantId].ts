/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { CompanyRepository } from '../../../../../repository/company.repository';
import { processAttendeesList } from '../[eventId]';

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
    const { companyId, participantId } = req.query;
    const company_id = companyId.toString();
    const participant_id = participantId.toString();
    console.log(`Company id ${company_id} + ${participant_id}`);
    const repo = container.resolve(CompanyRepository);

    if (req.method === 'POST') {
      const result = await repo.insertAttendeeIntoSaved(
        participant_id,
        company_id
      );
      console.log(result.data);
      if (!result.data) {
        throw new Error(
          'Either company_id or participant_id is null and invalid.'
        );
      }
      const returnData = processAttendeesList(result.data, company_id, true);
      return res.status(201).json({ data: returnData });
    } else if (req.method === 'DELETE') {
      const result = await repo.deleteAttendeeFromSaved(
        participant_id,
        company_id
      );

      //even if the user or company is null and thus nothing was deleted, should just do nothing and return 200
      return res.status(200).json({ data: [] });
    }

    return res.status(405).json({ message: 'Request not supported.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
