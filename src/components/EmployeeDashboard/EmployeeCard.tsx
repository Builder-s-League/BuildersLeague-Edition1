'use client'

import React from 'react'
import PageButton from './PageButton'
import Link from 'next/link'

interface EmployeeCardProps {
  name: string
  learningHours: number
  employeeNumber: number
}

export default function EmployeeCard({
  name,
  learningHours,
  employeeNumber,
}: EmployeeCardProps) {
  return (
    <div className="m-6 flex items-center justify-around gap-4 rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-all">
      <div className=" rounded-lg border border-gray-300 p-10">
        <p className="text-lg font-semibold text-gray-600">
          Employee {employeeNumber}: {name}
        </p>
      </div>
      <div className="flex flex-col p-10">
        <p className="rounded-full bg-blue-100 px-3 py-1 text-sm text-gray-600">
          Learning Hours: {learningHours}
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href={`/cbh/employee/edit/${employeeNumber}`}
            className="flex-1"
          >
            <PageButton label="Edit" className="w-full" />
          </Link>
          <Link href="/delete" className="flex-1">
            <PageButton label="Delete" className="w-full" />
          </Link>
        </div>
      </div>
    </div>
  )
}
