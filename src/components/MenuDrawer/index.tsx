import * as React from 'react'
import {
  Minus,
  Plus,
  X as CloseIcon,
  Menu as MenuIcon,
  ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'
import { mockedTypeLinks } from '@/mocks/type-links'

export default function MenuDrawer() {
  const topics = mockedTypeLinks
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <button>
          <MenuIcon className="h-8 w-8" aria-hidden="true" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="h-full w-full gap-5">
          <DrawerHeader>
            <DrawerClose asChild>
              <button>
                <CloseIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </DrawerClose>
          </DrawerHeader>
          {topics.map((topic) => (
            <div
              className="flex justify-between gap-2 border border-b"
              key={topic.id}
            >
              <Link
                href={`/topic/${topic.id}`}
                className="p- flex w-full items-center justify-between px-5 py-3 text-slate-300 hover:bg-gray-200 hover:text-background"
              >
                <p>{topic.title}</p>
                <div className="flex items-center gap-2">
                  <p className=" ">{topic.progress}%</p>
                  <ArrowRight className="h-6 w-6  " aria-hidden="true" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}