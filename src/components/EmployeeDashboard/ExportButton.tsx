'use client'
import React, { useMemo, useState } from 'react'
import PageButton from '@/components/EmployeeDashboard/PageButton'
import { parse } from 'json2csv'
import { createBrowserClient } from '@/utils/supabase'

export function ExportCSV() {
  const supabase = useMemo(() => createBrowserClient(), [])
  const handleExport = async () => {
    const csvData = await supabase
      .from('users')
      .select('id,name,email')
      .eq('role', 2)
    if (!csvData.data || csvData.data.length === 0) {
      alert('No data available for export')
      return
    }

    try {
      const csv = parse(csvData)
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'employee_export_data.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting CSV', error)
    }
  }

  return (
    <>
      <PageButton
        className="self-end"
        label="Export"
        onClick={() => handleExport()}
      />
    </>
  )
}
