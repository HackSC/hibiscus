import { EmployeeInsertInterface } from '@hacksc-platforms/types';
import { createClient } from '@supabase/supabase-js';
import { UserRepository } from './user-repository';

const supabaseUrl = 'http://localhost:54321';
const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs';

describe('Testing user repository', () => {
  afterEach(async () => {
    const supabase = createClient(supabaseUrl, anonKey);
    await supabase.from('employees').delete().throwOnError();
  });

  const userRepository = new UserRepository();

  it('creating a user should create user', async () => {
    const data: EmployeeInsertInterface = { name: 'Hello' };
    const users = await userRepository.createEmployee([data]);
    console.log(users);
    expect(users.length).toBe(1);
  });

  it('creating two users should create two users', async () => {
    const data: EmployeeInsertInterface[] = [
      { name: 'Hello' },
      { name: 'Vincent' },
    ];
    const users = await userRepository.createEmployee(data);
    expect(users.length).toBe(data.length);
  });
});
