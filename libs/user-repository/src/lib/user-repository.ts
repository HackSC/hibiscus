import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { EmployeeInsertInterface } from '@hacksc-platforms/types';

const supabaseUrl = 'http://localhost:54321';
const anonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs';

export class UserRepository {
  private readonly supabaseClient: SupabaseClient = createClient(
    supabaseUrl,
    anonKey
  );

  async createEmployee(data: EmployeeInsertInterface[]) {
    const response = await this.supabaseClient
      .from<EmployeeInsertInterface>('employees')
      .throwOnError()
      .insert(data);
    return response.body;
  }
}
