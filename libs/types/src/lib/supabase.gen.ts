export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName: string;
          query: string;
          variables: Json;
          extensions: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      application_status: {
        Row: {
          id: number;
          status: string | null;
        };
        Insert: {
          id?: number;
          status?: string | null;
        };
        Update: {
          id?: number;
          status?: string | null;
        };
      };
      discord_invites: {
        Row: {
          id: number;
          invite_code: string | null;
          invite_used: boolean;
          time_invite_used: string | null;
          user_profile_id: string | null;
        };
        Insert: {
          id?: number;
          invite_code?: string | null;
          invite_used: boolean;
          time_invite_used?: string | null;
          user_profile_id?: string | null;
        };
        Update: {
          id?: number;
          invite_code?: string | null;
          invite_used?: boolean;
          time_invite_used?: string | null;
          user_profile_id?: string | null;
        };
      };
      discord_profiles: {
        Row: {
          discord_profile: string | null;
          id: number;
          user_profile_id: string | null;
        };
        Insert: {
          discord_profile?: string | null;
          id?: number;
          user_profile_id?: string | null;
        };
        Update: {
          discord_profile?: string | null;
          id?: number;
          user_profile_id?: string | null;
        };
      };
      events: {
        Row: {
          created_at: string | null;
          description: string | null;
          end: string;
          id: number;
          location: string;
          name: string;
          start: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          end: string;
          id?: number;
          location: string;
          name: string;
          start: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          end?: string;
          id?: number;
          location?: string;
          name?: string;
          start?: string;
        };
      };
      invitations: {
        Row: {
          created_at: string | null;
          id: string;
          invited_id: string;
          organizer_id: string;
          team_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          invited_id: string;
          organizer_id: string;
          team_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          invited_id?: string;
          organizer_id?: string;
          team_id?: string;
        };
      };
      notes: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          id: string;
          note: string | null;
          participant_id: string | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          id?: string;
          note?: string | null;
          participant_id?: string | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          id?: string;
          note?: string | null;
          participant_id?: string | null;
        };
      };
      participants: {
        Row: {
          created_at: string | null;
          dob: string | null;
          graduation_year: string | null;
          id: string;
          major: string | null;
          portfolio_link: string | null;
          resume: string | null;
          school: string | null;
        };
        Insert: {
          created_at?: string | null;
          dob?: string | null;
          graduation_year?: string | null;
          id: string;
          major?: string | null;
          portfolio_link?: string | null;
          resume?: string | null;
          school?: string | null;
        };
        Update: {
          created_at?: string | null;
          dob?: string | null;
          graduation_year?: string | null;
          id?: string;
          major?: string | null;
          portfolio_link?: string | null;
          resume?: string | null;
          school?: string | null;
        };
      };
      pinned_events: {
        Row: {
          created_at: string | null;
          event_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          event_id: number;
          id?: number;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          event_id?: number;
          id?: number;
          user_id?: string;
        };
      };
      pointr_shortlinks: {
        Row: {
          created_at: string | null;
          id: number;
          path: string;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          path: string;
          url: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          path?: string;
          url?: string;
        };
      };
      roles: {
        Row: {
          created_at: string | null;
          discord_role_id: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          discord_role_id?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          discord_role_id?: string | null;
          id?: number;
          name?: string;
        };
      };
      teams: {
        Row: {
          created_at: string | null;
          description: string | null;
          name: string;
          organizer_id: string;
          photo_key: string | null;
          team_id: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          name: string;
          organizer_id: string;
          photo_key?: string | null;
          team_id?: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          name?: string;
          organizer_id?: string;
          photo_key?: string | null;
          team_id?: string;
        };
      };
      user_profiles: {
        Row: {
          app_id: string | null;
          application_status: number;
          attendance_confirmed: boolean | null;
          created_at: string | null;
          email: string | null;
          first_name: string;
          last_name: string;
          role: number | null;
          team_id: string | null;
          user_id: string;
        };
        Insert: {
          app_id?: string | null;
          application_status?: number;
          attendance_confirmed?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          last_name: string;
          role?: number | null;
          team_id?: string | null;
          user_id: string;
        };
        Update: {
          app_id?: string | null;
          application_status?: number;
          attendance_confirmed?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          last_name?: string;
          role?: number | null;
          team_id?: string | null;
          user_id?: string;
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
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      extension: {
        Args: { name: string };
        Returns: string;
      };
      filename: {
        Args: { name: string };
        Returns: string;
      };
      foldername: {
        Args: { name: string };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: { size: number; bucket_id: string }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits: number;
          levels: number;
          offsets: number;
          search: string;
          sortcolumn: string;
          sortorder: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
