'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBrowserClient } from '@/utils/supabase'
import bcrypt from 'bcryptjs'
//import { supabase } from '@supabase/index.ts'

// Utility function to generate a random password
function generatePassword(length = 12) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?'
  let passwordChars = [
    lowercase[Math.floor(Math.random() * lowercase.length)],
    uppercase[Math.floor(Math.random() * uppercase.length)],
    digits[Math.floor(Math.random() * digits.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ]

  const allChars = lowercase + uppercase + digits + specialChars
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(allChars[Math.floor(Math.random() * allChars.length)])
  }

  passwordChars = passwordChars.sort(() => Math.random() - 0.5)
  return passwordChars.join('')
}

export default function AddNewEmployee() {
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [notification, setNotification] = useState<string>('')

  const supabase = createBrowserClient()

  const handleAddEmployee = async () => {
    // Validate name, email, profile photo, and password
    if (!name || !email.includes('@') || !profilePhoto || !password) {
      setNotification(
        'Please enter a valid name, email address, upload a profile photo, and generate a password.',
      )
      return
    }
    // Insert user into your custom user table
    const hashedPassword = await bcrypt.hash(password, 10)

    const { error } = await supabase.from('users').insert({
      name: name,
      email: email,
      password: hashedPassword, // Store the hashed password
    })
    if (error) {
      console.error('Error adding user to table:', error.message)
    } else {
      console.log('User created successfully!')
    }

    // Proceed with adding the employee
    setNotification('Employee added successfully!')
    // Here you would usually call a function to add the employee
    // For example: addEmployee({ name, email, password, profilePhoto });
    // console.log("profilePhoto", profilePhoto)
    // const fileName = `${Date.now()}_${profilePhoto.name}`

    // const { data, error } = await supabase.storage
    //   .from('photos')
    //   .upload(fileName, profilePhoto)

    // if (error) {
    //   throw error
    // }
  }

  const passwordGenerator = () => {
    const newPass = generatePassword(12)
    setPassword(newPass)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!allowedTypes.includes(file.type)) {
        setNotification('Only JPEG, PNG, or GIF image files are allowed.')
        setProfilePhoto(null)
        return
      }
      setProfilePhoto(file)
      setNotification('') // Clear notification if file is valid
    }
  }

  return (
    <div className="bg-gray-0 flex min-h-screen items-center justify-center">
      <div className="max-w-md space-y-4 rounded-md border border-white bg-black p-6 text-white shadow-md">
        <div className="flex justify-between space-x-4">
          <Button className="rounded border border-white px-4 py-2">
            <a href="/employee">back to last page</a>
          </Button>
          <Button
            className="rounded border border-white px-4 py-2"
            onClick={handleAddEmployee}
          >
            add
          </Button>
          <Button className="rounded border border-white px-4 py-2">
            import
          </Button>
          <Button className="rounded border border-white px-4 py-2">
            export
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            className="w-full rounded border border-white p-2 text-white placeholder-gray-500"
            placeholder="Employee name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="w-full rounded border border-white p-2 text-white placeholder-gray-500"
            type="email"
            id="email"
            placeholder="Employee email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture" className="font-medium text-white">
            Employee profile photo
          </Label>
          <Input
            id="picture"
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="rounded border border-white p-2 text-white file:bg-black file:text-white"
            onChange={handleFileChange}
          />
          <Button
            className="w-full rounded border border-white p-2 placeholder-gray-500"
            onClick={passwordGenerator}
          >
            {password ? password : 'Generate Random Password'}
          </Button>
        </div>

        {notification && (
          <div
            className={`rounded p-2 ${
              notification === 'Employee added successfully!'
                ? 'bg-green-500'
                : 'bg-red-500'
            } text-white`}
          >
            {notification}
          </div>
        )}

        <div className="flex justify-center">
          <Button
            className="rounded border border-white px-4 py-2"
            onClick={handleAddEmployee}
          >
            Add test
          </Button>
        </div>
      </div>
    </div>
  )
}
