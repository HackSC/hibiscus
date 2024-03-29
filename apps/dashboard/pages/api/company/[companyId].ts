import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { CompanyRepository } from '../../../repository/company.repository';

function Company(
  id: string,
  name: string,
  description: string | null,
  website: string | null,
  profilePhoto: string | null
) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.website = website;
  this.profilePhoto = profilePhoto;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const repo = container.resolve(CompanyRepository);
  const { companyId } = req.query;
  const stringifyId = companyId.toString();

  try {
    //Get logic
    if (req.method === 'GET') {
      const result = await repo.getCompanyById(stringifyId);

      if (!result.data || !result) {
        return res.status(404).json({ message: 'Resource not found.' });
      }
      if (result.error) {
        throw new Error(result.error.message);
      }

      const returnCompany = new Company(
        result.data['id'],
        result.data['name'],
        result.data['description'],
        result.data['website'],
        result.data['profile_photo']
      );
      //must get majors and target graduations terms as well
      return res.status(200).json({ data: returnCompany });
    }
    return res.status(405).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
