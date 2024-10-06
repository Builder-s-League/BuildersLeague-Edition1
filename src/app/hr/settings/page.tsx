'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Fragment, useState } from 'react'

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

  return (
    <div className="flex w-1/2 flex-col border border-white">
      <div className="flex w-full flex-row ">
        <div className="inline-flex w-9/12 gap-6">
          <Button variant="outline" className="w-24">
            E
          </Button>
          <Button variant="outline" className="w-24">
            UGC
          </Button>
          <Button variant="destructive" className="w-24">
            Settings
          </Button>
        </div>
        <div className="w-1/4">
          <Button className="py-2/25 flex w-24 flex-col">
            <Link href="/login">Login/Out</Link>
          </Button>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex w-80 flex-col items-center py-8">
          <Fragment>
            {isPTag ? (
              <p className="m-1 inline-flex w-3/4 items-center">
                Organization name: {organizationNameUpdate}
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
              <p className="m-1 inline-flex w-3/4 items-center">
                Email: {emailUpdate}
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
              <p className="m-1 inline-flex w-3/4 items-center">
                Phone number: {phoneUpdate}
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
                className="m-1 flex w-44 flex-col"
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
              Test account info
            </Button>
            <Button className="mt-2 flex w-32 flex-col" variant="secondary">
              Contact us
            </Button>
          </div>
          <div className="mb-8 mt-10">
            <Button className="flex w-20 flex-col" variant="secondary">
              Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
