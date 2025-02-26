/**
 * @author Vinicius
 * @created 2025-02-25 1:33p.m.
 * @description Profile type
 */

export type Profile = {
  id: string
  name: string
  email: string
  contact_info: string
  created_at: string
  updated_at: string
  is_active: boolean
  role: number
  admin_id: string
  avatar_url: string
}
export interface ProfileSummary {
  id: string
  name: string
  email: string
  contact_info: string
  is_active: boolean
  avatar_url: string
}

export interface ProfileUpdate {
  name: string
  email: string
  contact_info: string
  is_active: boolean
}

export interface ProfileCreate {
  name: string
  email: string
  contact_info: string
  password: string
}
