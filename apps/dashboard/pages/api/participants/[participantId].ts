import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { PostgrestError } from '@supabase/supabase-js';
import { ParticipantRepository } from '../../../repository/participant.repository';

/**
 * Creates a team in the teams table
 * @param req - (id in url, resume, portfolio_link) : (string, string-link to resume,
 *      string-url link to portfolio)
 * @param res - Only used for returning Json messages
 * @return 400 if error in PUT. 500 if error in GET. 200 if get or put executed successfully
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(ParticipantRepository);
  const { participantId } = req.query;
  const stringifyId = participantId.toString();
  const resume: string | null = req.body.resume;
  const portfolioLink: string | null = req.body.portfolio_link;

  try {
    //Get logic
    if (req.method === 'GET') {
      const result = await repo.getParticipantInfo(stringifyId);
      if (result.error) {
        throw new Error(result.error.message);
      }
      console.log(result);
      return res.status(200).json({ data: result.data });
    } else if (req.method === 'PUT') {
      console.log(resume);
      console.log(portfolioLink);
      //Put logic
      if (!participantId || (!resume && !portfolioLink)) {
        throw new Error('One or more required parameters are missing.');
      }

      let result: { error: PostgrestError; data: unknown[] };
      if (resume) {
        result = await repo.updateParticipantResume(stringifyId, resume);
        if (result.error) {
          throw new Error(result.error.message);
        }
      }

      if (portfolioLink) {
        result = await repo.updateParticipantPortfolioLink(
          stringifyId,
          portfolioLink
        );
        if (result.error) {
          throw new Error(result.error.message);
        }
      }

      //returns row of updated participant
      return res.status(200).json({ data: result.data });
    }

    return res.status(400).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
