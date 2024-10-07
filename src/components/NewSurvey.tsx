import React, { useEffect, useState } from 'react'
import { createBrowserClient } from '@/utils/supabase'
interface NewSurveyProps {
  onClose: () => void
}
const NewSurvey: React.FC<NewSurveyProps> = ({ onClose }) => {
  const [surveyName, setSurveyName] = useState('')
  const [surveyLink, setSurveyLink] = useState('')
  const [surveyDate, setSurveyDate] = useState('')
  const [surveyTime, setSurveyTime] = useState('')
  const [targetOrgs, setTargetOrgs] = useState<number[]>([])
  const [organizations, setOrganizations] = useState<
    { id: number; name: string }[]
  >([])

  useEffect(() => {
    const fetchOrganizations = async () => {
      const supabase = createBrowserClient()
      const { data, error } = await supabase
        .from('users')
        .select('id, name')
        .eq('role', 1)
        .order('name')

      if (error) {
        console.error('Error fetching organizations:', error)
      } else {
        setOrganizations(data || [])
      }
    }

    fetchOrganizations()
  }, [])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setTargetOrgs(organizations.map((org) => org.id))
    } else {
      setTargetOrgs([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()

    // Insert the survey
    const { data: surveyData, error: surveyError } = await supabase
      .from('survey')
      .insert({
        name: surveyName,
        link: surveyLink,
        organization_id: 1, // Replace with actual organization ID
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: true,
      })
      .select()

    if (surveyError) {
      console.error('Error inserting survey:', surveyError)
      return
    }

    // Insert survey-organization relationships
    if (surveyData && surveyData[0]) {
      const surveyId = surveyData[0].id
      const relationshipData = targetOrgs.map((orgId) => ({
        parent_id: surveyId,
        organization_id: orgId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: relationshipError } = await supabase
        .from('survey_organizations')
        .insert(relationshipData)

      if (relationshipError) {
        console.error(
          'Error inserting survey-organization relationships:',
          relationshipError,
        )
      } else {
        console.log('Survey and relationships inserted successfully')
        onClose()
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">New Survey</h1>
      {/* <button
        className="rounded-lg bg-gray-200 p-2 shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={onClose}
      >
        Back
      </button> */}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="survey-name" className="block text-sm font-medium">
            Survey Name
          </label>
          <input
            type="text"
            id="survey-name"
            placeholder="Enter survey name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:ring focus:ring-blue-500"
            value={surveyName}
            onChange={(e) => setSurveyName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="survey-link" className="block text-sm font-medium">
            Link to Survey
          </label>
          <input
            type="url"
            id="survey-link"
            placeholder="Enter link to survey"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:ring focus:ring-blue-500"
            value={surveyLink}
            onChange={(e) => setSurveyLink(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="survey-date" className="block text-sm font-medium">
            Survey Date
          </label>
          <div className="flex space-x-4">
            <input
              type="date"
              id="survey-date"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:ring focus:ring-blue-500"
              value={surveyDate}
              onChange={(e) => setSurveyDate(e.target.value)}
            />
            <input
              type="time"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:ring focus:ring-blue-500"
              value={surveyTime}
              onChange={(e) => setSurveyTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium">Target Org</span>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={targetOrgs.length === organizations.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
              Select All
            </label>
            {organizations.map((org) => (
              <label key={org.id} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={targetOrgs.includes(org.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setTargetOrgs([...targetOrgs, org.id])
                    } else {
                      setTargetOrgs(
                        targetOrgs.filter((item) => item !== org.id),
                      )
                    }
                  }}
                />
                {org.name}
              </label>
            ))}
          </div>
        </div>

        <button
          className="w-full rounded-lg bg-blue-600 p-4 text-white shadow-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default NewSurvey
