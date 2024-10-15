'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { createBrowserClient } from '@/utils/supabase'

export async function fetchContent() {
  const response = await fetch('/api/cms')
  if (!response.ok) {
    throw new Error('Failed to fetch content')
  }
  const data = await response.json()
  return data
}

async function fetchReleases() {
  const supabase = createBrowserClient()

  const { data, error } = await supabase
    .from('schedules')
    .select('id, schedule_at, topic_id')
    .order('schedule_at', { ascending: false })

  if (error) {
    console.error('Error fetching releases:', error)
    return []
  }

  const contentOptions = await fetchContent()

  return data.map((item) => ({
    id: item.id,
    date: new Date(item.schedule_at).toLocaleDateString(),
    content:
      contentOptions.find((content: any) => content.id === item.topic_id)
        ?.title || 'Unknown Content',
  }))
}

async function deleteRelease(id: number) {
  const supabase = createBrowserClient()

  // First, delete related records in schedule_organizations
  const { error: deleteRelatedError } = await supabase
    .from('schedule_organizations')
    .delete()
    .eq('parent_id', id)

  if (deleteRelatedError) {
    console.error(
      'Error deleting related schedule organizations:',
      deleteRelatedError,
    )
    return false
  }

  // Then, delete the schedule
  const { error } = await supabase.from('schedules').delete().eq('id', id)

  if (error) {
    console.error('Error deleting release:', error)
    return false
  }

  return true
}

export default function SchedulePage() {
  const [releases, setReleases] = useState<any[]>([])

  useEffect(() => {
    fetchReleases().then(setReleases)
  }, [])

  const handleDelete = async (id: number) => {
    const success = await deleteRelease(id)
    if (success) {
      setReleases(releases.filter((release) => release.id !== id))
    } else {
      // You might want to show an error message to the user here
      console.error('Failed to delete release')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Releases</h1>
        <Link href="/hr/schedule/info?action=add">
          <Button>Add new +</Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {releases.map((release) => (
            <TableRow key={release.id}>
              <TableCell>{release.date}</TableCell>
              <TableCell>{release.content}</TableCell>
              <TableCell>
                <Link href={`/hr/schedule/info?action=edit&id=${release.id}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(release.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
