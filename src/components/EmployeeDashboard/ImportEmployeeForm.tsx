'use client'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Papa from 'papaparse'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProfileCreate } from '@/types/profile'
import { generateSecurePassword } from '@/utils/password'
import { Download, Trash2, RefreshCw } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

// Extend ProfileCreate to include generated password
interface CSVRecord extends Omit<ProfileCreate, 'password'> {
  password: string // Will be generated automatically
  selected?: boolean // For bulk selection
}

interface ImportEmployeeFormProps {
  onSubmit: (data: ProfileCreate[]) => Promise<void>
  title?: string
}

export default function ImportEmployeeForm({
  onSubmit,
  title = 'Import Employees',
}: ImportEmployeeFormProps) {
  const [csvData, setCsvData] = useState<CSVRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectAll, setSelectAll] = useState(true)

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse<Omit<CSVRecord, 'password' | 'selected'>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        // Validate required fields
        const invalidRows = result.data.filter(
          (row) => !row.name || !row.email || !row.contact_info,
        )

        if (invalidRows.length > 0) {
          setError('CSV file is missing required fields in some rows')
          return
        }

        // Add generated password and selected flag for each record
        const dataWithPasswords = result.data.map((row) => ({
          ...row,
          password: generateSecurePassword(),
          selected: true,
        }))

        setCsvData(dataWithPasswords)
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`)
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Only submit selected records
      const selectedData = csvData.filter((record) => record.selected)
      if (selectedData.length === 0) {
        throw new Error('Please select at least one employee to import')
      }
      await onSubmit(selectedData)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to import employees',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    const selectedData = csvData.filter((record) => record.selected)
    if (selectedData.length === 0) return

    const exportData = selectedData.map((employee) => ({
      name: employee.name,
      email: employee.email,
      password: employee.password,
    }))

    const csv = Papa.unparse(exportData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', 'employee_credentials.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleSelectAll = () => {
    setSelectAll(!selectAll)
    setCsvData(csvData.map((record) => ({ ...record, selected: !selectAll })))
  }

  const toggleSelect = (index: number) => {
    setCsvData(
      csvData.map((record, i) =>
        i === index ? { ...record, selected: !record.selected } : record,
      ),
    )
  }

  const regeneratePassword = (index: number) => {
    setCsvData(
      csvData.map((record, i) =>
        i === index
          ? { ...record, password: generateSecurePassword() }
          : record,
      ),
    )
  }

  const removeRecord = (index: number) => {
    setCsvData(csvData.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="csvFile">Upload CSV File</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="cursor-pointer"
                required
              />
              <p className="text-sm text-muted-foreground">
                File should contain columns: name, email, contact_info
              </p>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            {csvData.length > 0 && (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox
                            checked={selectAll}
                            onCheckedChange={toggleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Generated Password</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {csvData.map((employee, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Checkbox
                              checked={employee.selected}
                              onCheckedChange={() => toggleSelect(index)}
                            />
                          </TableCell>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.contact_info}</TableCell>
                          <TableCell>
                            <code className="rounded bg-muted px-2 py-1">
                              {employee.password}
                            </code>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => regeneratePassword(index)}
                                title="Regenerate Password"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeRecord(index)}
                                title="Remove"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleExport}
                    className="flex items-center gap-2"
                    disabled={!csvData.some((record) => record.selected)}
                  >
                    <Download className="h-4 w-4" />
                    Export Selected Credentials
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      loading || !csvData.some((record) => record.selected)
                    }
                    className="w-full sm:w-auto"
                  >
                    {loading ? 'Importing...' : 'Import Selected'}
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
