'use client'
import { MouseEventHandler } from 'react'

interface PageButtonProps {
  label: string
  link?: string
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function PageButton({ label, link, className, onClick }: PageButtonProps) {
  return (
    <a
      onClick={onClick}
      className={`m-2 rounded bg-gray-500 px-4 py-2 text-center text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500 ${className || ''}`}
      href={link}
    >
      {label}
    </a>
  )
}

export default PageButton
