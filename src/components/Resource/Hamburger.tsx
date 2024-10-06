'use client'

import * as React from 'react'
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { useState } from 'react'
import { X as CloseIcon, Menu as MenuIcon } from 'lucide-react' // Ensure you have lucide-react installed
import Link from 'next/link'
type Checked = DropdownMenuCheckboxItemProps['checked']

export function Hamburger() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Optional: Handle additional actions on trigger click
  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Perform any additional actions here
    console.log('Hamburger menu clicked!', event)
  }

  return (
    <div className="absolute left-3 top-3">
      <button onClick={handleTriggerClick} aria-label="Toggle Menu">
        {isOpen ? (
          <CloseIcon className="h-8 w-8" aria-hidden="true" />
        ) : (
          <MenuIcon className="h-8 w-8" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
