export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          id: number;
          name: string;
          created_at: string | null;
        };
        Insert: {
          id?: number;
          name: string;
          created_at?: string | null;
        };
        Update: {
          id?: number;
          name?: string;
          created_at?: string | null;
        };
      };
      user_profiles: {
        Row: {
          first_name: string;
          last_name: string;
          user_id: string;
          role: number | null;
          created_at: string | null;
        };
        Insert: {
          first_name: string;
          last_name: string;
          user_id: string;
          role?: number | null;
          created_at?: string | null;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          user_id?: string;
          role?: number | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
