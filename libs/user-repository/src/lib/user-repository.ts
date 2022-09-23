import { HibiscusSupabaseClient } from '@hacksc-platforms/hibiscus-supabase-client';
import { EmployeeInsertInterface } from '@hacksc-platforms/types';
import { injectable } from 'tsyringe';

@injectable()
export class UserRepository {
  constructor(private readonly hibiscusSupabase: HibiscusSupabaseClient) {}

  async createEmployees(data: EmployeeInsertInterface[]) {
    const response = await this.hibiscusSupabase
      .getClient()
      .from<EmployeeInsertInterface>('employees')
      .throwOnError()
      .insert(data);
    return response.body;
  }
}
