import * as React from 'react'
import {
  Minus,
  Plus,
  X as CloseIcon,
  Menu as MenuIcon,
  ArrowRight,
} from 'lucide-react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Link from 'next/link'
import { mockedTypeLinks } from '@/mocks/type-links'
import { mockTopics } from '@/mocks/topic'

export default function MenuDrawer() {
  const topics = mockTopics
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
            {topics.map((topic) => (
              <div
                className="flex justify-between gap-2 border border-b"
                key={topic.id}
              >
                <DrawerClose asChild>
                  <Link
                    href={`/emp/topic/${topic.id}`}
                    className="flex w-full items-center justify-between px-5 py-8"
                  >
                    <p className="flex-1 pr-5">{topic.title}</p>
                    <div className="flex items-center gap-2">
                      <p className=" ">{topic.progress}%</p>
                      <ArrowRight className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </Link>
                </DrawerClose>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
