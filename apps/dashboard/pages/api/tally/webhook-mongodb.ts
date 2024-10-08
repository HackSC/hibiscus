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
    'question_G6q8y2',
    'question_VGb2ya',
    'question_jZJ12R',
    'question_prJ89V',
    'question_MX6oyY',
    'question_PpbVyQ',
    'question_8q675A',
    'question_0dZN5Z',
    'question_dE8BVz',
    'question_5beW5M',
    'question_2XlQ5p',
    'question_EKZyYo',
    'question_r5JzWM',
    'question_OabOyK',
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
