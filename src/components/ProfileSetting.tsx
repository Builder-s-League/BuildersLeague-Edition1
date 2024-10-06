'use client'
import ImagePreviewModal from '@/components/Overlay/Modals/image-preview-modal'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from './ui/button'
import fetchMediaFromSupabase from '@/utils/supra-media'
import VideoPreview from './EmployeeSettings/video-preview'
import FooterButtons from './EmployeeSettings/footer-buttons'
import UserInfo from './EmployeeSettings/user-info'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export const ProfileSetting = () => {
  const [fileContent, setFileContent] = useState<null | string>(null)
  const [previewImageURL, setPreviewURL] = useState<string>('')
  const [fileToSend, sendFile] = useState<File | null>()
  const [isModalOpen, setModalOpen] = useState(false)
  const [help, setHelp] = useState(false)

  useEffect(() => {
    checkImageExistence()
  }, [])

  // Check if the image exists in Supabase storage
  const checkImageExistence = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('CBH_ProfileImage')
        .list('', { search: 'profile_image' }) // Check for the profile_image file

      if (error) {
        throw error
      }

      // If the image exists, fetch it
      if (data.length > 0) {
        fetchMediaFromSupabase('CBH_ProfileImage', 'profile_image', 'image')
      } else {
        console.log('No profile image found')
      }
    } catch (error) {
      console.error('Error checking image existence:', error)
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
        .upload(fileName, file, { upsert: true }) // Upload the file directly as binary

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

  const sectionToggle = () => {
    setHelp((prev) => !prev)
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
      <div className="relative mx-auto mt-12 flex h-[90vh] w-fit flex-col items-center rounded-2xl border-2 border-white p-6">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Profile Settings
        </h1>
        <div className="flex justify-between rounded-2xl px-4">
          <div className="flex flex-col items-center rounded-lg p-2">
            <UserInfo />
          </div>
          <div className="group m-4 flex h-[10rem] cursor-pointer flex-col items-center rounded-lg  p-4">
            <div className="relative">
              {fileContent ? (
                <img
                  src={fileContent}
                  alt="Uploaded"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  height={100}
                  width={100}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-20 rounded-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={profileChangeHandler}
                className="size-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-3xl text-gray-500 opacity-0"
              />
            </div>
            <label className="text-gray-500 group-hover:text-white">
              Edit Image
            </label>
          </div>
        </div>
        {help ? (
          <VideoPreview sectionToggle={sectionToggle} />
        ) : (
          <div className="m-4 flex w-full flex-col items-start gap-3 pl-16">
            <Button className="w-[10rem]">Change Password</Button>
            <Button className="w-[10rem]" onClick={sectionToggle}>
              Help
            </Button>
            <Button className="w-[10rem]">Logout</Button>
          </div>
        )}
        <FooterButtons />
      </div>
    </>
  )
}
