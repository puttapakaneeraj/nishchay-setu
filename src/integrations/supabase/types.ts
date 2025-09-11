export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      career_clusters: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          streams: string[] | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          streams?: string[] | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          streams?: string[] | null
        }
        Relationships: []
      }
      career_pathways: {
        Row: {
          cluster_id: string | null
          colleges: Json | null
          created_at: string
          degree_program: string | null
          description: string | null
          duration: string | null
          govt_jobs: Json | null
          higher_studies: Json | null
          id: string
          immediate_jobs: Json | null
          pathway_name: string
          roadmap_steps: Json | null
          stream: string
        }
        Insert: {
          cluster_id?: string | null
          colleges?: Json | null
          created_at?: string
          degree_program?: string | null
          description?: string | null
          duration?: string | null
          govt_jobs?: Json | null
          higher_studies?: Json | null
          id?: string
          immediate_jobs?: Json | null
          pathway_name: string
          roadmap_steps?: Json | null
          stream: string
        }
        Update: {
          cluster_id?: string | null
          colleges?: Json | null
          created_at?: string
          degree_program?: string | null
          description?: string | null
          duration?: string | null
          govt_jobs?: Json | null
          higher_studies?: Json | null
          id?: string
          immediate_jobs?: Json | null
          pathway_name?: string
          roadmap_steps?: Json | null
          stream?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_pathways_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "career_clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          contact_info: Json | null
          coordinates: Json | null
          created_at: string
          fees: Json | null
          id: string
          location: string | null
          name: string
          programs: string[] | null
          type: string | null
        }
        Insert: {
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          fees?: Json | null
          id?: string
          location?: string | null
          name: string
          programs?: string[] | null
          type?: string | null
        }
        Update: {
          contact_info?: Json | null
          coordinates?: Json | null
          created_at?: string
          fees?: Json | null
          id?: string
          location?: string | null
          name?: string
          programs?: string[] | null
          type?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          career_paths: Json | null
          colleges_offering: Json | null
          course_type: string | null
          created_at: string
          description: string | null
          duration: string | null
          entrance_exams: Json | null
          fees_range: Json | null
          id: string
          job_opportunities: Json | null
          level: string
          name: string
          roadmap_stages: Json | null
          specializations: Json | null
          updated_at: string
        }
        Insert: {
          career_paths?: Json | null
          colleges_offering?: Json | null
          course_type?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          entrance_exams?: Json | null
          fees_range?: Json | null
          id?: string
          job_opportunities?: Json | null
          level: string
          name: string
          roadmap_stages?: Json | null
          specializations?: Json | null
          updated_at?: string
        }
        Update: {
          career_paths?: Json | null
          colleges_offering?: Json | null
          course_type?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          entrance_exams?: Json | null
          fees_range?: Json | null
          id?: string
          job_opportunities?: Json | null
          level?: string
          name?: string
          roadmap_stages?: Json | null
          specializations?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          grade: string | null
          id: string
          location: string | null
          name: string | null
          quiz_completed: boolean | null
          quiz_scores: Json | null
          top_career_cluster: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          grade?: string | null
          id?: string
          location?: string | null
          name?: string | null
          quiz_completed?: boolean | null
          quiz_scores?: Json | null
          top_career_cluster?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          grade?: string | null
          id?: string
          location?: string | null
          name?: string | null
          quiz_completed?: boolean | null
          quiz_scores?: Json | null
          top_career_cluster?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
