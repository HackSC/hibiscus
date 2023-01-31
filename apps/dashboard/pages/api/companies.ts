import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { DashboardRepository } from '../../repository/dashboard.repository';
import { PostgrestError } from '@supabase/supabase-js';

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
  const name: string = req.body.name;
  const description: string | null = req.body.description;
  const website: string | null = req.body.website;
  const profilePhoto: string | null = req.body.profile_photo;
  const targetMajors: string[] | null = req.body.target_majors;
  const targetGraduations: string[] | null = req.body.target_graduations;

  try {
    //Get logic
    if (req.method === 'POST') {
      //Post logic
      if (!name) {
        throw new Error('Company name is missing.');
      }

      const result = await repo.insertCompany(
        name,
        description,
        website,
        profilePhoto
      );
      if (result.error) {
        throw new Error(result.error.message);
      }

      const companyId = result.data['id'];

      //only execute if this parameter is filled
      let majorsData: { data: any[]; error: PostgrestError };
      if (targetMajors) {
        majorsData = await repo.insertMajors(companyId, targetMajors);
      }

      let graduationYearsData: { data: any[]; error: PostgrestError };
      if (targetGraduations) {
        graduationYearsData = await repo.insertGraduationTerms(
          companyId,
          targetGraduations
        );
      }

      return res.status(201).json({
        ...result.data,
        target_majors: majorsData.data,
        target_graduations: graduationYearsData.data,
      });
    }

    return res.status(400).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
