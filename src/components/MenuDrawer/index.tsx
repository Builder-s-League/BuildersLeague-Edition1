import * as React from 'react'
import { X as CloseIcon, Menu as MenuIcon, ArrowRight } from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'

import { useEffect, useState } from 'react'

export default function MenuDrawer() {
  const [topics, setTopics] = useState<[] | null>(null)
  useEffect(() => {
    getTopics()
  }, [])

  const getTopics = async () => {
    const response = await fetch('http://localhost:3001/api/topics', {
      cache: 'no-cache',
    })
    const data = await response.json()
    setTopics(data.docs)
  }

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button>
          <MenuIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex h-full w-full flex-col">
          <DrawerHeader>
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-bold">Course Topics</h2>
              <DrawerClose asChild>
                <button>
                  <CloseIcon className="h-8 w-8" aria-hidden="true" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto">
            {topics
              ? topics.map((topic: any) => (
                  <div
                    className="flex justify-between gap-2 border border-b"
                    key={topic?.id}
                  >
                    <DrawerClose asChild>
                      <Link
                        href={`/emp/topics/${topic?.id}`}
                        className="flex w-full items-center justify-between px-5 py-8"
                      >
                        <p className="flex-1 pr-5">{topic?.title}</p>
                        <div className="flex items-center gap-2">
                          <p className=" ">{topic?.progress ?? 0}%</p>
                          <ArrowRight className="h-6 w-6" aria-hidden="true" />
                        </div>
                      </Link>
                    </DrawerClose>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
