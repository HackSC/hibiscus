/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { NextApiRequest, NextApiResponse } from 'next';
import { container } from 'tsyringe';
import { CompanyRepository } from 'apps/dashboard/repository/company.repository';

function Company(
  id: string,
  name: string,
  description: string | null,
  website: string | null,
  profilePhoto: string | null,
  targetGraduations: string[],
  targetMajors: string[]
) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.website = website;
  this.profilePhoto = profilePhoto;
  this.targetGraduations = targetGraduations;
  this.targetMajors = targetMajors;
}

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
  const repo = container.resolve(CompanyRepository);
  const { companyId } = req.query;
  const stringifyId = companyId.toString();
  //needed for update, might cut if cannot complete
  // const targetGraduations: string[] | null = req.body.target_graduations;
  // const targetMajors: string[] | null = req.body.target_majors;

  try {
    //Get logic
    if (req.method === 'GET') {
      const result = await repo.getCompanyById(stringifyId);
      if (result.error) {
        throw new Error(result.error.message);
      }

      if (!result.data || !result) {
        return res.status(404).json({ message: 'Resource not found.' });
      }
      const flattenedGraduations = deconstructNestedArray(
        result.data['target_graduations'] as any[],
        'graduation_year'
      );
      const flattenedMajors = deconstructNestedArray(
        result.data['target_majors'] as any[],
        'major'
      );
      const returnCompany = new Company(
        result.data['id'],
        result.data['name'],
        result.data['description'],
        result.data['website'],
        result.data['profile_photo'],
        flattenedGraduations,
        flattenedMajors
      );
      //must get majors and target graduations terms as well
      return res.status(200).json({ data: returnCompany });
    }
    return res.status(405).json({ message: 'Invalid request type.' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

function deconstructNestedArray(
  nestedObjectArray: any[],
  parameterName: string
) {
  //only operate if not empty
  const returnArray: string[] = [];
  if (nestedObjectArray.length) {
    nestedObjectArray.forEach((ele) => {
      returnArray.push(ele[parameterName]);
    });

    return returnArray;
  } else {
    return [];
  }
}
