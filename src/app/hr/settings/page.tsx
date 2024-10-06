'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Settings() {
  const [isPTag, setPtag] = useState(true)
  const [isUpdate, setUpdate] = useState(true)
  const initalOrganizationName = 'Origatou'
  const initialEmail = 'origatou@gmail.com'
  const initialPhone = '431 xxx xxxx'
  const [organizationName, setOrganizationName] = useState(
    initalOrganizationName,
  )
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhone)

  function handleCLick() {
    setPtag(false)
    setUpdate(false)
  }

  function cancelClick() {
    setOrganizationName(initalOrganizationName)
    setEmail(initialEmail)
    setPhone(initialPhone)
    setPtag(true)
    setUpdate(true)
  }

  let organizationNameUpdate = organizationName
  let emailUpdate = email
  let phoneUpdate = phone

  function updateClick() {
    setPtag(true)
    setUpdate(true)
  }

  const path = usePathname()

  return (
    <div className="max-w mx-auto gap-1 rounded-lg p-6 shadow-md">
      <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Settings
      </h1>
      <div className="flex justify-evenly">
        <div className="flex w-80 flex-col items-start py-8">
          <Fragment>
            {isPTag ? (
              <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
                <span className="font-bold">Organization name:</span>{' '}
                {organizationNameUpdate}
              </p>
            ) : (
              <Input
                className="float-right ml-1 w-3/4"
                placeholder="Organization name"
                onChange={(e) => setOrganizationName(e.target.value)}
                value={organizationName}
                type="text"
              ></Input>
            )}
          </Fragment>
          <Fragment>
            {isPTag ? (
              <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
                <span className="font-bold">Email:</span> {emailUpdate}
              </p>
            ) : (
              <Input
                className="float-right ml-1 w-3/4"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              ></Input>
            )}
          </Fragment>
          <Fragment>
            {isPTag ? (
              <p className="mb-2 max-w-2xl text-lg font-light text-foreground">
                <span className="font-bold">Phone Number:</span> {phoneUpdate}
              </p>
            ) : (
              <Input
                className="float-right ml-1 w-3/4"
                placeholder="Phone number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
              ></Input>
            )}
          </Fragment>
          <Fragment>
            {isUpdate ? (
              <Button
                className="w-50 m-1 flex flex-col"
                variant="outline"
                onClick={handleCLick}
              >
                Update Organization
              </Button>
            ) : (
              <div className="mt-1 flex gap-4">
                <Button
                  className="flex w-1/2 flex-col"
                  variant="outline"
                  onClick={updateClick}
                >
                  Update
                </Button>
                <Button
                  className="flex w-1/2 flex-col"
                  variant="outline"
                  onClick={cancelClick}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Fragment>
        </div>
        <div>
          <div>
            <Button className="mt-7 flex w-32 flex-col" variant="secondary">
              Test Account Info
            </Button>
            <Button className="mt-2 flex w-32 flex-col" variant="secondary">
              Contact us
            </Button>
          </div>
          <div className="mb-8 mt-10">
            <Button className="mt-2 flex w-32 flex-col" variant="secondary">
              Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
