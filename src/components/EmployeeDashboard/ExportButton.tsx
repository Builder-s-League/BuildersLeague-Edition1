'use client'
import React, { useMemo } from 'react'
import { createBrowserClient } from '@/utils/supabase'
import { parse } from 'json2csv'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

export function ExportCSVButton({ hrId }: { hrId: string }) {
  const supabase = createBrowserClient()

  const handleExport = async () => {
    try {
      // First get the current user to determine admin status
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error('Please sign in to export data')
        return
      }

      // Fetch employees based on admin_id
      const { data: employees, error: employeesError } = await supabase
        .from('profiles')
        .select(
          `
        id,
        name,
        email,
        contact_info,
        created_at,
        is_active
      `,
        )
        .eq('role', 1)
        .order('name', { ascending: true })

      if (employeesError) {
        toast.error('Failed to fetch employee data')
        return
      }

      if (!employees || employees.length === 0) {
        toast.warning('No employees available for export')
        return
      }

      // Format the data for CSV
      const formattedData = employees.map((emp) => ({
        'Employee ID': emp.id,
        Name: emp.name,
        Email: emp.email,
        'Contact Info': emp.contact_info,
        Status: emp.is_active ? 'Active' : 'Inactive',
        'Created Date': new Date(emp.created_at).toLocaleDateString(),
      }))

      // Generate CSV
      const csv = parse(formattedData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const timestamp = new Date().toISOString().split('T')[0]

      // Download file
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `employees_${timestamp}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Employee data exported successfully')
    } catch (error) {
      console.error('Error exporting CSV:', error)
      toast.error('Failed to export employee data')
    }
  }

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleExport}
    >
      <Download className="h-4 w-4" />
      <span>Export</span>
    </Button>
  )
}
