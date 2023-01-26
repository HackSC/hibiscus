import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../../repository/dashboard.repository';
import { PostgrestError } from '@supabase/supabase-js';
import e from 'express';

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
  const { companyId } = req.query;
  const stringifyId = companyId.toString();
  const targetMajors: string[] | null = req.body.target_majors;
  const targetGraduations: string[] | null = req.body.target_graduations;

  try {
    //Get logic
    if (req.method === 'GET') {
      const result = await repo.getCompanyById(stringifyId);
      if (result.error) {
        throw new Error(result.error.message);
      }

      //must get majors and target graduations terms as well
      return res.status(200).json({ data: result.data });
    }
    // else if (req.method === 'PUT') {
    //   console.log(resume);
    //   console.log(portfolioLink);
    //   //Put logic
    //   if (!participantId || (!resume && !portfolioLink)) {
    //     throw new Error('One or more required parameters are missing.');
    //   }

    //   let result: { error: PostgrestError; data: unknown[] };
    //   if (resume) {
    //     result = await repo.updateParticipantResume(stringifyId, resume);
    //     if (result.error) {
    //       throw new Error(result.error.message);
    //     }
    //   }

    //   if (portfolioLink) {
    //     result = await repo.updateParticipantPortfolioLink(
    //       stringifyId,
    //       portfolioLink
    //     );
    //     if (result.error) {
    //       throw new Error(result.error.message);
    //     }
    //   }

    //   //returns row of updated participant
    //   return res.status(200).json({ data: result.data });
    // }

    return res.status(400).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
