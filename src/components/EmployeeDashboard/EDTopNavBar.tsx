import React, { useState } from 'react'
import PageButton from '@/components/EmployeeDashboard/PageButton'

export default function EDTopNavBar() {
  return (
    <>
      <div className="flex w-full flex-col p-4">
        <div className="flex justify-between space-x-4">
          <PageButton
            className="self-start"
            label="Back to last page"
            link="/"
          />
          <div className="  flex flex-col space-y-2">
            <div className="flex flex-row gap-4">
              <PageButton
                className="self-end"
                label="Add"
                link="/cbh/employee/add"
              />
              <PageButton
                className="self-end"
                label="Import"
                link="/cbh/employee/import"
              />
              <PageButton
                className="self-end"
                label="Export"
                link="/cbh/employee/export"
              />
            </div>
            <PageButton label="Email to all" link="/email" />
          </div>
        </div>
      </div>
    </>
  )
}
