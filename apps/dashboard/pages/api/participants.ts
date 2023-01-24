import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../repository/dashboard.repository';

/**
 * Creates a team in the teams table
 * @param req - (name, description, photoKey, userId) : (string, string,
 *      string-link to photo, string-user_id of person creating team)
 * @param res - Only used for returning Json messages
 * @return 500 if error in creation. 200 if team created successfully
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(DashboardRepository);
  const id: string = req.body.id;
  const firstName: string = req.body.first_name;
  const lastName: string = req.body.last_name;
  const major: string = req.body.major;
  const graduationYear: string = req.body.graduation_year;
  const resume: string | null = req.body.resume;
  const portfolioLink: string | null = req.body.portfolio_link;

  try {
    //Get logic
    if (req.method === 'GET') {
      const result = await repo.getAllParticipants();
      return res.status(200).json({ data: result.data });
    } else if (req.method === 'POST') {
      //Post logic
      if (!id || !firstName || !lastName || !major || !graduationYear) {
        throw new Error('One or more required parameters are missing.');
      }

      const result = await repo.insertNewParticipant(
        id,
        firstName,
        lastName,
        major,
        graduationYear,
        resume,
        portfolioLink
      );
      if (result.error) {
        throw new Error(result.error.message);
      }

      return res.status(201).json({ data: result.data });
    }
    return res.status(400).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
