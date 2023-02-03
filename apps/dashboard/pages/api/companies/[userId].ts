import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { CompanyRepository } from '../../../repository/company.repository';
import { UserRepository } from '../../../repository/user.repository';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(CompanyRepository);
  const userRepo = container.resolve(UserRepository);
  const { userId } = req.query;
  const stringifyUserId = userId.toString();

  try {
    //Get logic
    if (req.method === 'GET') {
      //get user info, check if role level is 3
      const userInfo = await userRepo.getBareUserInfoById(stringifyUserId);
      if (userInfo.data['role'] === 3) {
        //get company id and return it
        const companyData = await repo.getCompanyandEventId(
          userInfo.data['user_id']
        );
        if (!companyData.data)
          throw new Error('User id does not map to anything.');

        //we know companies can't be null. This indexes down the object tree to get event_id. ASSUMED THAT NOTHING IS NULL OR ANYTHING
        const eventId = companyData.data['companies']['events'].at(0)['id'];
        const companyId = companyData.data['company_id'];

        return res
          .status(200)
          .json({ data: { company_id: companyId, event_id: eventId } });
      } else {
        return res.status(401).json({ message: 'Unauthorized access.' });
      }
    }

    return res.status(405).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
