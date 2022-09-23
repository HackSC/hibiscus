import { Database } from './supabase.gen';

export type EmployeeReadInterface =
  Database['public']['Tables']['employees']['Row'];
export type EmployeeInsertInterface =
  Database['public']['Tables']['employees']['Insert'];
