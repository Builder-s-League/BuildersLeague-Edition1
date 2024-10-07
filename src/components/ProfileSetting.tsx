'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Camera, Key, HelpCircle, LogOut, User } from 'lucide-react'

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
    <Card className="mx-auto mt-12 max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value="John Doe" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input id="nickname" value="John" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="john.doe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" value="January 1, 1999" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value="123 This St" readOnly />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gray-200">
              {fileContent ? (
                <img
                  src={fileContent}
                  alt="Profile picture"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <Label htmlFor="picture" className="cursor-pointer">
              <div className="flex items-center space-x-2 rounded-md bg-secondary px-3 py-2 text-sm font-medium">
                <Camera className="h-4 w-4" />
                <span>Change Picture</span>
              </div>
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={profileChangeHandler}
                className="sr-only"
              />
            </Label>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>Change Password</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <HelpCircle className="h-4 w-4" />
            <span>Help</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
        <div className="mt-6 flex justify-center space-x-2">
          <Button variant="outline" size="sm">
            F
          </Button>
          <Button variant="outline" size="sm">
            C
          </Button>
          <Button variant="outline" size="sm">
            N
          </Button>
          <Button variant="outline" size="sm">
            P
          </Button>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="h-48 w-48 overflow-hidden rounded-full">
              <img
                src={previewImageURL}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex space-x-4">
              <Button onClick={onConfirm}>Confirm</Button>
              <Button variant="outline" onClick={onModalClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
