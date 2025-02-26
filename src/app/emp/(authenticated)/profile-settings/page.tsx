import { ProfileSetting } from '@/components/ProfileSetting'
import { getProfile } from './actions'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProfileSettingsPage() {
  const profile = await getProfile()

  if (!profile) {
    notFound()
  }

  return <ProfileSetting initialProfile={profile} />
}
