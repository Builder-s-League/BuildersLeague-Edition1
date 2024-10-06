"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Fragment, useState } from "react";

export default function Settings() {
    const [isPTag, setPtag] = useState(true);
    const [isUpdate, setUpdate] = useState(true);
    const initalOrganizationName = 'Origatou';
    const initialEmail = 'origatou@gmail.com';
    const initialPhone = '431 xxx xxxx';
    const [organizationName, setOrganizationName] = useState(initalOrganizationName);
    const [email, setEmail] = useState(initialEmail);
    const [phone, setPhone] = useState(initialPhone);

    function handleCLick() {
      setPtag(false);
      setUpdate(false);
    }

    function cancelClick() {
      setOrganizationName(initalOrganizationName);
      setEmail(initialEmail);
      setPhone(initialPhone);
      setPtag(true);
      setUpdate(true);
    }

    let organizationNameUpdate = organizationName;
    let emailUpdate = email;
    let phoneUpdate = phone;

    function updateClick() {
      
      setPtag(true);
      setUpdate(true);
    }

  return (
    <div className="flex flex-col w-3/4">
      <div className="flex flex-row w-full">
        <div className="inline-flex w-9/12 gap-6">
          <Button variant="outline" className="w-24">E</Button>
          <Button variant="outline" className="w-24">UGC</Button>
          <Button variant="destructive" className="w-24">Settings</Button>
        </div>
        <div className="w-1/4 ml-14">
          <Button className="flex flex-col w-24 py-2/25 px-3/100 gap-3/20 ml-18/100">
            <Link href="/login">Login/Out</Link>
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="px-8 py-8 w-96">
          <p className="inline-flex m-1 w-full items-center">Organization name:
            <Fragment>{
              isPTag ? (<span className="ml-2">{organizationNameUpdate}</span>) : (<Input className="ml-1 float-right w-1/2" onChange={e => setOrganizationName(e.target.value)} value={organizationName} type="text"></Input>)}
            </Fragment>
          </p>
          <p className="inline-flex m-1 w-full items-center">Email:
            <Fragment>{
              isPTag ? (<span className="ml-2">{emailUpdate}</span>) : (<Input className="ml-1 float-right w-1/2" onChange={e => setEmail(e.target.value)} value={email} type="email"></Input>)}
            </Fragment>
          </p>
          <p className="inline-flex m-1 w-full items-center">Phone number:
            <Fragment>{
              isPTag ? (<span className="ml-2">{phoneUpdate}</span>) : (<Input className="ml-1 float-right w-1/2" onChange={e => setPhone(e.target.value)} value={phone} type="tel"></Input>)}
            </Fragment>
          </p>
          <Fragment>{
            isUpdate ? (<Button className="flex flex-col w-44 m-1" variant="outline" onClick={handleCLick}>Update Organization</Button>) :
              (<div className="flex mt-1 gap-4">
                <Button className="flex flex-col w-1/4" variant="outline" onClick={updateClick}>Update</Button>
                <Button className="flex flex-col w-1/4" variant="outline" onClick={cancelClick}>Cancel</Button>
              </div>)
          }</Fragment>
        </div>
        <div>
          <div>
            <Button className="flex flex-col w-32 mt-7" variant="secondary">Test account info</Button>
            <Button className="flex flex-col w-32 mt-2" variant="secondary">Contact us</Button>
          </div>
          <div className="mt-10">
            <Button className="flex flex-col w-20" variant="secondary">Feedback</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
