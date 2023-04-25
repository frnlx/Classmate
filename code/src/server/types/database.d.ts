export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      class_members: {
        Row: {
          class_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
      }
      classes: {
        Row: {
          classname: string
          classpfpurl: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          classname: string
          classpfpurl?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          classname?: string
          classpfpurl?: string | null
          created_at?: string | null
          id?: string
        }
      }
      countries: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
      }
      users: {
        Row: {
          bio: string
          created_at: string
          id: string
          name: string
          pfp: string
        }
        Insert: {
          bio: string
          created_at?: string
          id: string
          name: string
          pfp: string
        }
        Update: {
          bio?: string
          created_at?: string
          id?: string
          name?: string
          pfp?: string
        }
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
