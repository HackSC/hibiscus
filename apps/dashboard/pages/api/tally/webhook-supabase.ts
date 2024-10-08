import { getEnv } from '@hibiscus/env';
import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;

    if (isValidBody(body)) {
      const field = body.data.fields.find(
        ({ label, type }) =>
          label === 'hibiscusUserId' && type === 'HIDDEN_FIELDS'
      );
      if (field === undefined || field === null || field.value === '') {
        return createResponse(
          400,
          `No user ID provided for application ID ${body.data.responseId}`
        );
      }

      // Update DB
      const { data, error } = await updateDb(field.value, body.data.responseId);

      if (error !== null) {
        return createResponse(
          500,
          `Unable to update user ${field.value} application ID ${body.data.responseId} in Supabase: ${error.message}`
        );
      } else if (data === null || data.length === 0) {
        return createResponse(
          500,
          `Unable to update user ${field.value} application ID ${body.data.responseId} in Supabase: user does not exist`
        );
      }

      return createResponse(200, 'Success');
    } else {
      return createResponse(400, 'Invalid request body');
    }
  } else {
    return res.status(405).send('Method not allowed');
  }
};

type RequestBody = {
  data: {
    responseId: string;
    fields: { key: string; label: string; type: string; value: any }[];
  };
};

function isValidBody(body: any): body is RequestBody {
  return (
    'data' in body &&
    'responseId' in body.data &&
    'fields' in body.data &&
    Array.isArray(body.data.fields) &&
    body.data.fields.every(
      (field: any) =>
        'key' in field &&
        'label' in field &&
        'type' in field &&
        'value' in field
    )
  );
}

async function updateDb(
  userId: string,
  applicationId: string
): Promise<PostgrestSingleResponse<any[]>> {
  const supabase = createClient(
    getEnv().Hibiscus.Supabase.apiUrl,
    getEnv().Hibiscus.Supabase.serviceKey
  );

  const res = await supabase
    .from('user_profiles')
    .update({ app_id: applicationId, application_status: 3 })
    .eq('user_id', userId)
    .select();

  return res;
}

function createResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({ meta: { statusCode: status, message } }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export default handler;
