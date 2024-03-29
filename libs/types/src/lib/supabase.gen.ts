export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
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
        Relationships: [];
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
        Relationships: [];
      };
      bonus_points: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          link: string | null;
          name: string;
          points: number;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          link?: string | null;
          name: string;
          points: number;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          link?: string | null;
          name?: string;
          points?: number;
        };
        Relationships: [];
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
          log_id?: string;
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
        Relationships: [
          {
            foreignKeyName: 'bonus_points_log_bonus_points_id_fkey';
            columns: ['bonus_points_id'];
            referencedRelation: 'bonus_points';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bonus_points_log_status_fkey';
            columns: ['status'];
            referencedRelation: 'bonus_point_status';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bonus_points_log_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [];
      };
      company_saved_participants: {
        Row: {
          company_id: string;
          created_at: string | null;
          id: number;
          saved: boolean;
          user_id: string;
        };
        Insert: {
          company_id: string;
          created_at?: string | null;
          id?: number;
          saved: boolean;
          user_id: string;
        };
        Update: {
          company_id?: string;
          created_at?: string | null;
          id?: number;
          saved?: boolean;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'company_saved_participants_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'company_saved_participants_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'participants';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'discord_invites_user_profile_id_fkey';
            columns: ['user_profile_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
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
        Relationships: [];
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
        Relationships: [
          {
            foreignKeyName: 'event_log_event_id_fkey';
            columns: ['event_id'];
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'event_log_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'participants';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'events_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'invitations_invited_id_fkey';
            columns: ['invited_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'invitations_organizer_id_fkey';
            columns: ['organizer_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'invitations_team_id_fkey';
            columns: ['team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['team_id'];
          }
        ];
      };
      leaderboard: {
        Row: {
          bonus_points: number;
          event_points: number;
          total_points: number | null;
          user_id: string;
        };
        Insert: {
          bonus_points?: number;
          event_points?: number;
          total_points?: number | null;
          user_id: string;
        };
        Update: {
          bonus_points?: number;
          event_points?: number;
          total_points?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'leaderboard_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'notes_participant_id_fkey';
            columns: ['participant_id'];
            referencedRelation: 'participants';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'participants_id_fkey';
            columns: ['id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'pinned_events_event_id_fkey';
            columns: ['event_id'];
            referencedRelation: 'events';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'pinned_events_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
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
        Relationships: [];
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
        Relationships: [];
      };
      sponsor_user_bridge_company: {
        Row: {
          company_id: string;
          created_at: string | null;
          id: string;
          user_id: string;
        };
        Insert: {
          company_id: string;
          created_at?: string | null;
          id?: string;
          user_id: string;
        };
        Update: {
          company_id?: string;
          created_at?: string | null;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'sponsor_user_bridge_company_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'sponsor_user_bridge_company_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'target_graduations_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'target_majors_company_id_fkey';
            columns: ['company_id'];
            referencedRelation: 'companies';
            referencedColumns: ['id'];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: 'teams_organizer_id_fkey';
            columns: ['organizer_id'];
            referencedRelation: 'user_profiles';
            referencedColumns: ['user_id'];
          }
        ];
      };
      user_profiles: {
        Row: {
          app_id: string | null;
          application_status: number;
          application_status_last_changed: string | null;
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
          application_status_last_changed?: string | null;
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
          application_status_last_changed?: string | null;
          attendance_confirmed?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          last_name?: string;
          role?: number | null;
          team_id?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_profiles_application_status_fkey';
            columns: ['application_status'];
            referencedRelation: 'application_status';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_profiles_role_fkey';
            columns: ['role'];
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_profiles_team_id_fkey';
            columns: ['team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['team_id'];
          },
          {
            foreignKeyName: 'user_profiles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_volunteers: {
        Args: Record<PropertyKey, never>;
        Returns: string[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
