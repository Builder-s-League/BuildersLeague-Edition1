'use client'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

export const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  function handleOldPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setOldPassword(e.target.value)
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleConfirmNewPasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (password === confirmPassword) {
    }
  }

  return (
    <>
      <div className="container">
        <Label htmlFor="OldPassword">Old Password</Label>
        <Input
          id="OldPassword"
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
        ></Input>

        <Label htmlFor="NewPassword">New Password</Label>
        <Input
          id="NewPassword"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        ></Input>

        <Label htmlFor="ConfirmNewPassword">Confirm New Password</Label>
        <Input
          id="ConfirmNewPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmNewPasswordChange}
        ></Input>

        <Button
          disabled={
            oldPassword.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
          }
          onSubmit={handleSubmit}
        >
          Change Password
        </Button>
      </div>
    </>
  )
}

/*

add bar: localhost:3000/emp/change-password

*/
