'use client'
import React, { ChangeEvent, useState } from 'react'
import OrganizationCBHFooter from '@/components/OrganizationCBH/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import EDTopNavBar from '@/components/EmployeeDashboard/EDTopNavBar'
import Papa from 'papaparse'
import internal from 'stream'

interface CSVRecord {
  employeename: string
  employeeemailaddress: string
  employeeid: string
}

export default function ImportEmployee() {
  const [csvData, setCsvData] = useState<CSVRecord[]>([])

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file =
      event.currentTarget &&
      event.currentTarget.files &&
      event.currentTarget.files[0]
    if (!file) {
      return
    }

    Papa.parse<CSVRecord>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const dataWithEmployeeID = result.data.map((item, index) => ({
          employeename: item.employeename,
          employeeemailaddress: item.employeeemailaddress,
          employeeid: `EMP${index + 1}`, // Generating employee ID automatically
        }))

        setCsvData(dataWithEmployeeID)
      },
    })
  }

  return (
    <>
      <EDTopNavBar />

      <div className="container mx-auto p-4">
        <div className="mb-6 rounded border p-4">
          <h2 className="mb-4 text-center text-lg">Import Employees</h2>
          <form
            onSubmit={() => handleFileUpload}
            className="grid grid-cols-1 gap-4"
          >
            <label> Profile Photo </label>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              placeholder="Profile Photo"
              required
            />

            {csvData.length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Employee Name</th>
                    <th>Employee Email Address</th>
                    <th>Employee ID</th>
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.employeename}</td>
                      <td>{employee.employeeemailaddress}</td>
                      <td>{employee.employeeid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <Button
              type="submit"
              className="rounded bg-blue-500 p-2 text-white"
            >
              Save
            </Button>
          </form>
        </div>
        <OrganizationCBHFooter />
      </div>
    </>
  )
}
