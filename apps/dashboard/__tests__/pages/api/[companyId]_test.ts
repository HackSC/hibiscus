/* eslint-disable @typescript-eslint/ban-types */
import '@testing-library/jest-dom';
import handler from 'apps/dashboard/pages/api/company/[companyId]';
import { NextApiRequest } from 'next';
import { jest, describe, it } from '@jest/globals';

jest.mock('next', () => {
  const originalModule = jest.requireActual('next');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    NextApiRequest: {
      query: 'id',
      body: JSON.stringify({
        discount: 0.2,
        tax: 0.06,
        items: [
          {
            id: 1,
            price: 19.99,
            quantity: 2,
          },
          {
            id: 2,
            price: 43.49,
            quantity: 1,
          },
        ],
      }),
    },
  };
});

test('get company info', () => {
  // const req: NextApiRequest = {
  //   query: {"id": "12345"},
  //   cookies: {},
  //   body: JSON.stringify({
  //     discount: .2,
  //     tax: .06,
  //     items: [
  //       {
  //         id: 1,
  //         price: 19.99,
  //         quantity: 2
  //       },
  //       {
  //         id: 2,
  //         price: 43.49,
  //         quantity: 1
  //       }
  //     ]
  //   }),
  //   env: process.env
  // }

  // const json = jest.fn();

  // const status = jest.fn(() => {
  //   return {
  //     json
  //   }
  // })

  // const res = {
  //   status
  // }

  jest.mock('NextApiRequest');

  expect(2 + 2).toBe(3);
});
