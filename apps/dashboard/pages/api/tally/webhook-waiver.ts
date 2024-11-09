import { getEnv } from '@hibiscus/env';
import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
import { NextApiHandler, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;

    const field = body.data.fields.find(
      ({ label, type }) => label === 'question_DB9A6R' && type === 'INPUT_TEXT'
    );
    if (field === undefined || field === null || field.value === '') {
      return createResponse(
        res,
        400,
        `No email provided for application ID ${body.data.responseId}`
      );
    }

    // Update DB
    const { data, error } = await updateDb(field.value);

    if (error !== null) {
      return createResponse(
        res,
        500,
        `Unable to update user ${field.value} application ID ${body.data.responseId} in Supabase: ${error.message}`
      );
    } else if (data === null || data.length === 0) {
      return createResponse(
        res,
        500,
        `Unable to update user ${field.value} application ID ${body.data.responseId} in Supabase: user does not exist`
      );
    }

    return createResponse(res, 200, 'Success');
  } else {
    return res.status(405).send('Method not allowed');
  }
};

async function updateDb(
  email: string
): Promise<PostgrestSingleResponse<any[]>> {
  const supabase = createClient(
    getEnv().Hibiscus.Supabase.apiUrl,
    getEnv().Hibiscus.Supabase.serviceKey
  );

  const resUP = await supabase
    .from('user_profiles')
    .select('user_id')
    .eq('email', email);
  if (resUP.data == null || resUP.data.length === 0) {
    return resUP;
  }

  const res = await supabase
    .from('participants')
    .update({ waiver_signed: true })
    .eq('id', resUP.data[0].user_id)
    .select();

  return res;
}

function createResponse(res: NextApiResponse, status: number, message: string) {
  return res.status(status).json({ meta: { statusCode: status, message } });
}

export default handler;
