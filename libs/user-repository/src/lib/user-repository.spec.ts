import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import { EmployeeInsertInterface } from '@hacksc-platforms/types';
import { container } from 'tsyringe';
import { UserRepository } from './user-repository';

describe('Testing user repository', () => {
  const hibiscusSupabase = container.resolve(HibiscusSupabaseClient);
  const userRepository = container.resolve(UserRepository);

  afterEach(async () => {
    container.clearInstances();
    await hibiscusSupabase
      .getClient()
      .from('employees')
      .delete()
      .throwOnError();
  });

  it('creating a user should create user', async () => {
    const data: EmployeeInsertInterface = { name: 'Hello' };
    const users = await userRepository.createEmployees([data]);
    console.log(users);
    expect(users.length).toBe(1);
  });

  it('creating two users should create two users', async () => {
    const data: EmployeeInsertInterface[] = [
      { name: 'Hello' },
      { name: 'Vincent' },
    ];
    const users = await userRepository.createEmployees(data);
    expect(users.length).toBe(data.length);
  });
});
