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
      bonus_point_status: {
        Row: {
          id: number;
          status: string;
        };
        Insert: {
          id: number;
          status: string;
        };
        Update: {
          id?: number;
          status?: string;
        };
      };
      bonus_points: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          points: number;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name: string;
          points: number;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          points?: number;
        };
      };
      bonus_points_log: {
        Row: {
          bonus_points_id: string;
          log_id: string;
          status: number;
          timestamp: string | null;
          user_id: string;
        };
        Insert: {
          bonus_points_id: string;
          log_id: string;
          status?: number;
          timestamp?: string | null;
          user_id: string;
        };
        Update: {
          bonus_points_id?: string;
          log_id?: string;
          status?: number;
          timestamp?: string | null;
          user_id?: string;
        };
      };
      companies: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          profile_photo: string | null;
          website: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          profile_photo?: string | null;
          website?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          profile_photo?: string | null;
          website?: string | null;
        };
      };
      companies_saved_user_profiles: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          id: number;
          participant_id: string | null;
          saved: boolean | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          id?: number;
          participant_id?: string | null;
          saved?: boolean | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          id?: number;
          participant_id?: string | null;
          saved?: boolean | null;
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
      event_log: {
        Row: {
          check_in_time: string;
          event_id: number;
          log_id: number;
          user_id: string;
        };
        Insert: {
          check_in_time?: string;
          event_id: number;
          log_id?: number;
          user_id: string;
        };
        Update: {
          check_in_time?: string;
          event_id?: number;
          log_id?: number;
          user_id?: string;
        };
      };
      events: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          description: string | null;
          end: string;
          id: number;
          location: string;
          name: string;
          points: number;
          start: string;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          end: string;
          id?: number;
          location: string;
          name: string;
          points: number;
          start: string;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          end?: string;
          id?: number;
          location?: string;
          name?: string;
          points?: number;
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
      leaderboard: {
        Row: {
          bonus_points: number;
          event_points: number;
          user_id: string;
        };
        Insert: {
          bonus_points?: number;
          event_points?: number;
          user_id: string;
        };
        Update: {
          bonus_points?: number;
          event_points?: number;
          user_id?: string;
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
          wristband_id: string | null;
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
          wristband_id?: string | null;
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
          wristband_id?: string | null;
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
      target_graduations: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          graduation_year: string | null;
          id: string;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          graduation_year?: string | null;
          id?: string;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          graduation_year?: string | null;
          id?: string;
        };
      };
      target_majors: {
        Row: {
          company_id: string | null;
          created_at: string | null;
          id: string;
          major: string | null;
        };
        Insert: {
          company_id?: string | null;
          created_at?: string | null;
          id?: string;
          major?: string | null;
        };
        Update: {
          company_id?: string | null;
          created_at?: string | null;
          id?: string;
          major?: string | null;
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
      get_volunteers: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
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
