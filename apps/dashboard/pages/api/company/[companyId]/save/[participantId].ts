/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { AttendeeRepository } from '../../../../../repository/attendee.repository';
import { region } from 'libs/hackform-client/src/lib/aws';

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
    const user_id = userId.toString();
    const repo = container.resolve(AttendeeRepository);

    //insert into the checkin list
    // const { error } = await repo
    //   .from('company_saved_participant')
    //   .insert({
    //     user_id: user_id,
    //     companyId: company_id,
    //     saved: true,
    //     created_at: new Date().toISOString(),
    //   });

    if (error.status != 201) {
      return res.status(500).json({ message: error.statusText });
    }
    return res.status(200).json({});
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
