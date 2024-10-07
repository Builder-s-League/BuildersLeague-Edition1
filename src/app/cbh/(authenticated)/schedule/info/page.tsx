'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createBrowserClient } from '@/utils/supabase'
import { fetchContent } from '../page'

interface ScheduleInfoSchema {
  id?: number
  topic_id: string | undefined
  //   organization_id: number
  cbh_admin_id: number
  schedule_at: string
  created_at?: string
  updated_at: string
}

export default function ScheduleInfoPage({
  searchParams,
}: {
  searchParams: { action: string; id?: number }
}) {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [selectedContent, setSelectedContent] = useState<string | undefined>(
    undefined,
  )
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null)
  const [contentOptions, setContentOptions] = useState<any[]>([])
  const [orgData, setOrgData] = useState<any[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])
  const supabase = createBrowserClient()

  useEffect(() => {
    fetchContent().then(setContentOptions)
  }, [])

  useEffect(() => {
    async function fetchOrganizations() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email, contact_info, isactive')
          .eq('role', 1)

        if (error) throw error

        setOrgData(data || [])
      } catch (err) {
        console.error('Error fetching organizations:', err)
      }
    }

    fetchOrganizations()
  }, [])

  useEffect(() => {
    if (searchParams.action === 'edit' && searchParams.id) {
      const fetchSchedule = async () => {
        const { data: scheduleData, error: scheduleError } = await supabase
          .from('schedules')
          .select('*')
          .eq('id', searchParams.id)
          .single()

        if (scheduleError) {
          console.error('Error fetching schedule:', scheduleError)
        } else if (scheduleData) {
          setDate(
            new Date(scheduleData.schedule_at).toISOString().split('T')[0],
          )
          setTime(
            new Date(scheduleData.schedule_at)
              .toTimeString()
              .split(' ')[0]
              .slice(0, 5),
          )
          setSelectedContent(scheduleData.topic_id)

          // Fetch associated companies
          const { data: companiesData, error: companiesError } = await supabase
            .from('schedule_organizations')
            .select('organization_id')
            .eq('parent_id', scheduleData.id)

          if (companiesError) {
            console.error(
              'Error fetching associated companies:',
              companiesError,
            )
          } else if (companiesData) {
            setSelectedCompanies(
              companiesData.map((item) => item.organization_id),
            )
          }
        }
      }

      fetchSchedule()
    }
  }, [searchParams.action, searchParams.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const scheduleData: ScheduleInfoSchema = {
      topic_id: selectedContent,
      cbh_admin_id: 1, // This should be the logged-in admin's ID
      schedule_at: `${date}T${time}:00`,
      updated_at: new Date().toISOString(),
    }

    try {
      let scheduleId: number

      if (searchParams.action === 'edit' && searchParams.id) {
        const { data, error } = await supabase
          .from('schedules')
          .update(scheduleData)
          .eq('id', searchParams.id)
          .select()

        if (error) throw error
        scheduleId = searchParams.id
      } else {
        scheduleData.created_at = new Date().toISOString()
        const { data, error } = await supabase
          .from('schedules')
          .insert(scheduleData)
          .select()

        if (error) throw error
        scheduleId = data[0].id
      }

      // Update Schedule_Organizations
      if (searchParams.action === 'edit') {
        // Delete existing associations
        await supabase
          .from('schedule_organizations')
          .delete()
          .eq('parent_id', scheduleId)
      }

      // Insert new associations
      const organizationData = selectedCompanies.map((companyId) => ({
        parent_id: scheduleId,
        organization_id: companyId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: orgError } = await supabase
        .from('schedule_organizations')
        .insert(organizationData)

      if (orgError) throw orgError

      console.log('Schedule saved successfully')
      router.push('/hr/schedule')
    } catch (error) {
      console.error('Error saving schedule:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Add New Release</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-bold">
            Date
          </label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="mb-2 block text-sm font-bold">
            Time
          </label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold">Content</label>
          {contentOptions.map((content) => (
            <div key={content.id} className="flex items-center space-x-2">
              <input
                type="radio"
                id={content.id}
                name="content"
                value={content.id}
                checked={selectedContent === content.id}
                onChange={(e) => setSelectedContent(e.target.value)}
              />
              <label htmlFor={content.id}>{content.title}</label>
            </div>
          ))}
        </div>
        <div>
          <label className="mb-2 block text-sm font-bold">Companies</label>
          {orgData.map((company) => (
            <div key={company.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`company-${company.id}`}
                name="company"
                value={company.id}
                checked={selectedCompanies.includes(company.id)}
                onChange={(e) => {
                  const companyId = Number(e.target.value)
                  setSelectedCompanies((prev) =>
                    e.target.checked
                      ? [...prev, companyId]
                      : prev.filter((id) => id !== companyId),
                  )
                }}
              />
              <label htmlFor={`company-${company.id}`}>{company.name}</label>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/hr/schedule')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
