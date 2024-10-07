export interface Survey {
  id: number
  name: string
  link: string
  organization_id: number
  created_at: string
  updated_at: string
  status: boolean
  survey_organizations: {
    organization_id: number
    users: {
      name: string
    }
  }[]
}
