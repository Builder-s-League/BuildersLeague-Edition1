'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import ImagePreviewModal from '@/components/Overlay/Modals/image-preview-modal'
import Image from 'next/image'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export const ProfileSetting = () => {
  const [fileContent, setFileContent] = useState<null | string>(null)
  const [previewImageURL, setPreviewURL] = useState<string>('')
  const [fileToSend, sendFile] = useState<File | null>()
  const [isModalOpen, setModalOpen] = useState(false)

  // Add new state for user profile data
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    contact_info: '',
  })

  // Add loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserProfile()
    checkImageExistence()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from('users').select('*').single()

      if (error) throw error

      if (data) {
        setProfileData({
          id: data.id,
          name: data.name || '',
          email: data.email || '',
          contact_info: data.contact_info || '',
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setError('Failed to load profile data')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to validate inputs
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const contactRegex = /^\d{3}-\d{3}-\d{4}$/

    if (!emailRegex.test(profileData.email)) {
      return 'Please enter a valid email address.'
    }

    if (!contactRegex.test(profileData.contact_info)) {
      return 'Please enter a valid contact info in the format xxx-xxx-xxxx.'
    }

    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Validate email and contact info
      const validationError = validateInputs()
      if (validationError) {
        setError(validationError)
        setIsLoading(false)
        return
      }

      // First, check if we have an ID
      if (!profileData.id) {
        setError('No user ID found')
        return
      }

      const { error } = await supabase
        .from('users')
        .update({
          name: profileData.name,
          email: profileData.email,
          contact_info: profileData.contact_info,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileData.id)

      if (error) {
        // Log the specific error
        console.error('Supabase error:', error)
        setError(`Update failed: ${error.message}`)
        return
      }

      alert('Profile updated successfully!')
    } catch (error) {
      // Log the full error object
      console.error('Full error:', error)
      setError(
        error instanceof Error ? error.message : 'Failed to update profile',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const checkImageExistence = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('CBH_ProfileImage')
        .list('', { search: 'profile_image' })

      if (error) {
        throw error
      }

      if (data.length > 0) {
        fetchImageFromSupabase()
      } else {
        console.log('No profile image found')
      }
    } catch (error) {
      console.error('Error checking image existence:', error)
    }
  }

  const fetchImageFromSupabase = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('CBH_ProfileImage')
        .download('profile_image')

      if (error) {
        throw error
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = reader.result as string
        setFileContent(base64data)
      }
      reader.readAsDataURL(data)
    } catch (error) {
      console.error('Error fetching image from Supabase:', error)
    }
  }

  const profileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileReader = new FileReader()

      fileReader.onload = (evt: ProgressEvent<FileReader>) => {
        setPreviewURL(evt.target?.result as string)
        sendFile(file)
        setModalOpen(true)
      }

      fileReader.onerror = (error) => {
        console.error('Error reading file:', error)
      }

      fileReader.readAsDataURL(file)
    }
  }

  const uploadImageToSupabase = async (file: File) => {
    const fileName = 'profile_image'

    try {
      const { data, error } = await supabase.storage
        .from('CBH_ProfileImage')
        .upload(fileName, file, { upsert: true })

      if (error) throw error

      console.log('Image uploaded successfully:', data)
    } catch (error) {
      console.error('Error uploading image to Supabase:', error)
    }
  }

  const onModalClose = () => {
    setModalOpen(false)
  }

  const onConfirm = () => {
    setFileContent(previewImageURL)

    if (fileToSend) uploadImageToSupabase(fileToSend)

    setModalOpen(false)
  }

  return (
    <>
      {isModalOpen && (
        <ImagePreviewModal
          imageURL={previewImageURL}
          onReset={onModalClose}
          onConfirm={onConfirm}
        />
      )}
      <div className="p-4">
        <header className="space-y-2">
          <div className="mb-4 flex items-center gap-4">
            {fileContent ? (
              <div className="overflow-hidden rounded-full">
                <Image
                  src={fileContent}
                  alt="Profile Image"
                  width={96}
                  height={96}
                  className="rounded-full"
                  layout="fixed"
                  objectFit="cover"
                  quality={100}
                />
              </div>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                <PersonIcon className="h-20 w-20 text-gray-300" />
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{profileData.name}</h1>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  (
                    document.querySelector(
                      'input[type="file"]',
                    ) as HTMLInputElement
                  )?.click()
                }
              >
                Change Photo
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={profileChangeHandler}
                className="hidden"
              />
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardContent className="flex flex-col gap-4 p-4">
              {error && <div className="text-sm text-red-500">{error}</div>}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="contact_info">Contact Info</Label>
                <Input
                  id="contact_info"
                  value={profileData.contact_info}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  className="w-full"
                  onClick={handleUpdateProfile}
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
              <div className=" flex flex-col gap-4">
                <Link href="/emp/change-password" className="w-full">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                </Link>

                <Link href="/cbh/about" className="w-full">
                  <Button variant="outline" className="w-full">
                    Help
                  </Button>
                </Link>
                <Button variant="destructive" className="w-full">
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
