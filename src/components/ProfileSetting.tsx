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

  useEffect(() => {
    checkImageExistence()
  }, [])

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
              <h1 className="text-2xl font-bold">John Doe</h1>
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
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input id="nickname" defaultValue="John" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Label htmlFor="dob">DOB</Label>
                <Input id="dob" defaultValue="January 1, 1999" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 This St" />
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="w-full">Update Profile</Button>
              </div>
              <div className=" flex flex-col gap-4">
                <Link href="" className="w-full">
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
