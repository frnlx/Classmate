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
