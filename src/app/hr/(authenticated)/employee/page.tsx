'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card' // Example of card component

const employees = [
  {
    id: 1,
    name: 'Michael Johnson',
    position: 'Sales Manager',
    department: 'Sales',
  },
  {
    id: 2,
    name: 'Emily Davis',
    position: 'Senior Account Executive',
    department: 'Sales',
  },
  {
    id: 3,
    name: 'David Lee',
    position: 'Business Development Representative',
    department: 'Business Development',
  },
  {
    id: 4,
    name: 'Sarah Brown',
    position: 'Marketing Specialist',
    department: 'Marketing',
  },
  {
    id: 5,
    name: 'James Wilson',
    position: 'Sales Operations Analyst',
    department: 'Sales Operations',
  },
  {
    id: 6,
    name: 'Jessica Garcia',
    position: 'Customer Success Manager',
    department: 'Customer Success',
  },
]

const EmployeePage = () => {
  const handleAdd = () => {
    // Logic for adding an employee
    console.log('Add Employee')
  }

  const handleImport = () => {
    // Logic for importing employees
    console.log('Import Employees')
  }

  const handleExport = () => {
    // Logic for exporting employees
    console.log('Export Employees')
  }

  const handleEmailToAll = () => {
    // Logic for emailing all employees
    console.log('Email to All Employees')
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Employee Directory</h1>

      {/* Action Buttons */}
      <div className="mb-6 ">
        <Button className="mr-2" onClick={handleAdd}>
          Add
        </Button>
        <Button variant="secondary" className="mr-2" onClick={handleImport}>
          Import
        </Button>
        <Button variant="secondary" className="mr-2" onClick={handleExport}>
          Export
        </Button>
        <Button variant="secondary" className="mt-2" onClick={handleEmailToAll}>
          Email to All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <Card key={employee.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {employee.name}
              </CardTitle>
              <CardDescription>{employee.position}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Department: {employee.department}
              </p>
              <Button className="mt-4">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default EmployeePage
