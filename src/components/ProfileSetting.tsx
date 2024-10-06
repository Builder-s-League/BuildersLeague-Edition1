'use client'
import ImagePreviewModal from '@/components/Overlay/Modals/image-preview-modal'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Button } from './ui/button'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

export const ProfileSetting = () => {
  const [fileContent, setFileContent] = useState<null | string>(null)
  const [previewImageURL, setPreviewURL] = useState<string>('')
  const [fileToSend, sendFile] = useState<File | null>()
  const [isModalOpen, setModalOpen] = useState(false)
  const [help, setHelp] = useState(false)
  const [videoContent, setVideoContent] = useState<null | string>(null)

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
        .from('CBH_ProfileImage') // Your bucket name
        .download('profile_image') // The file path in the bucket

      if (error) {
        throw error
      }

      // Convert the downloaded image to a base64 string
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64data = reader.result as string

        setFileContent(base64data) // Set the base64 string as the file content
      }
      reader.readAsDataURL(data) // Convert the blob to base64
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

  function handleHelp() {
    setHelp((prev) => !prev)

    if (help) fetchVideoFromSupabase()
  }

  const fetchVideoFromSupabase = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('CBH_video') // Your bucket name for videos
        .download('sample-video.mp4') // The file path to the video in the bucket

      if (error) {
        throw error
      }

      // Convert the downloaded blob (video) into a URL
      const videoUrl = URL.createObjectURL(data)

      // Set the video URL in state to use in a video player
      setVideoContent(videoUrl) // Assuming setFileContent sets the video URL
    } catch (error) {
      console.error('Error fetching video from Supabase:', error)
    }
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
      <div className="mx-auto mt-12 flex w-fit flex-col items-center rounded-2xl border-2 border-white p-6">
        <h1 className="mb-4 text-center text-2xl font-bold">
          Profile Settings
        </h1>
        <div className="flex flex-row rounded-2xl bg-slate-500 p-4">
          <div className="m-4 flex flex-col items-center rounded-lg bg-slate-200 p-4">
            <div className="flex flex-row rounded-lg p-4">
              <div className="mr-4 flex flex-col font-semibold">
                <label>Full Name: </label>
                <label>Nickname: </label>
                <label>Email: </label>
                <label>DOB: </label>
                <label>Address: </label>
              </div>
              <div className="flex flex-col">
                <label>John Doe</label>
                <label>John</label>
                <label>john.doe@example.com</label>
                <label>January 1, 1999</label>
                <label>123 This St</label>
              </div>
            </div>
            {help ? (
              <div className="space-y-3 ">
                <Button onClick={handleHelp}>Back</Button>
                {videoContent && (
                  <video
                    src={videoContent}
                    className="h-20 w-full bg-white"
                    controls
                  />
                )}
              </div>
            ) : (
              <div className="mt-4 flex w-48 flex-col gap-3">
                <Button>Change Password</Button>
                <Button onClick={handleHelp}>Help</Button>
                <Button>Logout</Button>
              </div>
            )}
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
        <div className="border-grey flex gap-2 rounded-lg border-2 p-4">
          <Button>F</Button>
          <Button>C</Button>
          <Button>N</Button>
          <Button>P</Button>
        </div>
      </div>
    </>
  )
}
