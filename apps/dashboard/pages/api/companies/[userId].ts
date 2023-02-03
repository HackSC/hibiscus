import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { PostgrestError } from '@supabase/supabase-js';
import { CompanyRepository } from '../../../repository/company.repository';
import { UserRepository } from '../../../repository/user.repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(CompanyRepository);
  const userRepo = container.resolve(UserRepository);
  const { userId } = req.query;
  console.log(userId);
  const stringifyUserId = userId.toString();

  try {
    //Get logic
    if (req.method === 'GET') {
      //get user info, check if role level is 3
      const userInfo = await userRepo.getBareUserInfoById(stringifyUserId);
      console.log(userInfo.data);
      if (userInfo.data['role'] === 3) {
        //get company id and return it
        const companyId = await repo.getCompanyId(userInfo.data['user_id']);
        if (!companyId.data)
          throw new Error('User id does not map to anything.');

        return res.status(200).json({ data: companyId.data });
      } else {
        return res.status(401).json({ message: 'Unauthorized access.' });
      }
    }

    return res.status(405).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
