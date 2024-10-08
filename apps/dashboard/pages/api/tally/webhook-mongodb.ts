import { getEnv } from '@hibiscus/env';
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return createResponse(400, `Method ${req.method} not supported`);
  }

  const payload = req.body;
  const application = transformPayload(payload);
  const success = await write(application);

  if (!success) {
    return createResponse(
      500,
      `Unable to insert application ${application?.responseId}`
    );
  }

  return createResponse(200, 'Success');
};

/**
 * Transforms a single webhook payload to suitable format for inserting into the database
 * @param payload - Payload of single webhook event
 */
function transformPayload(payload) {
  const application = payload.data;

  const fieldsToMap = [
    'question_vGEkZg',
    'question_0Q1YDN',
    'question_44A6Pr',
    'question_KYvAb8',
    'question_pbRXaJ',
    'question_Xx1dXg',
    'question_0Q1zXy',
    'question_xX474r',
    'question_Y5pX8B',
    'question_dWKXro',
    'question_ja5RGQ',
    'question_5B8Yp6',
    'question_dWKovq',
    'question_ZjvAvo',
    'question_2E1WOe',
    'question_xX4q9d',
    'question_Zjv7PV',
  ];

  for (const key of fieldsToMap) {
    const field = application.fields.find((f) => f.key === key);
    mapOptions(field);
  }

  application.applicationStatus = 0;

  const newFields = normalizeFields(application.fields);

  return { ...application, ...newFields };
}

function mapOptions(obj) {
  obj.value = obj.value?.map(
    (v) => obj.options.find((option) => option.id === v)?.text
  );
  delete obj.options;
}

function normalizeFields(arr) {
  return arr.reduce((acc, field) => {
    let value = field.value;
    if (
      Array.isArray(value) &&
      (value.length === 0 || typeof value[0] === 'string')
    ) {
      value = value.toString();
    }
    return { ...acc, [field.key]: value };
  }, {});
}

async function write(application) {
  const client = new MongoClient(getEnv().Hibiscus.FeatureFlag.MongoURI);

  try {
    const db = client.db('hacksc-f24');
    const coll = db.collection('applications');

    // Write
    const res = await coll.insertOne(application);
    return res.acknowledged;
  } catch {
    return false;
  }
}

function createResponse(status, message) {
  return {
    statusCode: status,
    headers: { 'Content-Type': 'application/json' },
    body: { meta: { statusCode: status, message } },
  };
}

export default handler;
