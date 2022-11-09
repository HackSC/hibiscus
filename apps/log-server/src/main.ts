/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import 'reflect-metadata';
import * as express from 'express';
import LogController from './controllers/log.controller';

const app = express();
//const router = express.Router();
app.use(express.json());
LogController.initialize();

app.use(express.json());

app.post('/', LogController.createLog);
app.get('/', LogController.getLog);

app.get('/api/yup_demo', async (req, res) => {
  const schema = {
    title: 'User',
    description: 'Schema for User',
    type: 'object',
    properties: {
      name: {
        description: 'Name of User',
        type: 'string',
      },
      email: {
        description: 'Email of user',
        type: 'string',
        format: 'email',
      },
    },
    required: ['name', 'email'],
  };

  const config = {
    errMessages: {
      name: {
        required: 'Must input a name',
      },
      email: {
        required: 'Must include an email',
        format: 'Not a valid email address',
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { buildYup } = require('schema-to-yup');
  const yupSchema = buildYup(schema, config);
  const valid = await yupSchema.isValid({
    name: 'Jordan',
    email: 'jordan.sefah@gmail.com',
  });

  res.send({ valid });
});

//
app.post('/api/yup_post', (req, res) => {
  try {
    const schema = req.body.schema; //req.body is Javascript Object
    const config = req.body.config;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { buildYup } = require('schema-to-yup');
    buildYup(schema, config);
    res.send('All good!');
  } catch (e) {
    res.send(e);
  }
});
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
