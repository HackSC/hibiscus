import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { container } from 'tsyringe';
import { CompanyRepository } from '../company.repository';
import { faker } from '@faker-js/faker';
import { HibiscusRole } from '@hibiscus/types';
import _ from 'lodash';

describe('SponsorRepository', () => {
  const companyRepo = container.resolve(CompanyRepository);
  const hbc = container.resolve(HibiscusSupabaseClient);
  hbc.setOptions({ useServiceKey: true });
  const client = hbc.getClient();
  const fakeCompanyIds: string[] = [];
  const fakeCompanyToEventIds: Record<string, string[]> = {};
  const fakeUserIds: string[] = [];
  const fakeEventIds: string[] = [];

  beforeAll(async () => {
    // create 5 companies
    Array.from(Array(5)).forEach(async () => {
      const { data, error } = await client
        .from('companies')
        .insert({
          name: faker.company.name(),
        })
        .select('id')
        .single();
      if (error) {
        throw error;
      }
      if (data === null) {
        throw new Error('data null');
      }
      fakeCompanyIds.push(data.id);
      fakeCompanyToEventIds[data.id] = [];
    });

    // create 3 fake users
    for (let i = 0; i < 3; i++) {
      const {
        data: { user },
        error,
      } = await client.auth.admin.createUser({
        email: faker.internet.email(),
        password: faker.internet.password(10),
        email_confirm: true,
      });

      if (error) throw error;

      if (user != null) {
        await client.from('user_profiles').insert({
          user_id: user.id,
          email: user.email,
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          role: Object.keys(HibiscusRole).indexOf(HibiscusRole.HACKER) + 1,
        });
        fakeUserIds.push(user.id);
      }
    }

    // create 6 fake events, assoc them with some random companies
    for (let i = 0; i < 6; i++) {
      const startDate = faker.date.future();
      const companyId = _.sample(fakeCompanyIds);
      const { data, error } = await client
        .from('events')
        .insert({
          name: 'Event ' + i,
          points: faker.datatype.number({ min: 100, max: 200 }),
          description: faker.lorem.words(20),
          start: startDate,
          end: faker.date.future(1, startDate),
          location: faker.address.buildingNumber(),
          company_id: companyId,
        })
        .select('id')
        .single();
      if (error) throw error;
      if (data !== null) {
        fakeEventIds.push(data.id);
        fakeCompanyToEventIds[companyId].push(data.id);
      }
    }

    // create 10 fake event logs, associating them with random users and events
    for (let i = 0; i < 10; i++) {
      const { data, error } = await client.from('event_log').insert({
        event_id: _.sample(fakeEventIds),
        user_id: _.sample(fakeUserIds),
      });
      if (error) throw error;
    }
  });
});
