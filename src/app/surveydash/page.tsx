'use client'
import NewSurvey from '@/components/NewSurvey'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const SurveyPage = () => {
  const [isNewSurveyOpen, setIsNewSurveyOpen] = useState(false)
  const surveys = [
    {
      id: 1,
      name: 'First one',
      date: 'Sept.21, 2024',
      link: 'https://docs.goo...',
      targetOrg: 'ACME inc, Ori.Gotou',
      active: true,
    },
    {
      id: 2,
      name: 'content',
      date: 'Aug.1, 2024',
      link: 'https://docs.goo...',
      targetOrg: 'ACME inc, Ori.Gotou',
      active: true,
    },
    {
      id: 3,
      name: 'Like it?',
      date: 'Jul.1, 2024',
      link: 'https://docs.goo...',
      targetOrg: 'ACME inc',
      active: true,
    },
    {
      id: 4,
      name: 'Feedback',
      date: 'Jun.21, 2024',
      link: 'https://docs.goo...',
      targetOrg: '*',
      active: true,
    },
    {
      id: 5,
      name: 'Feedback2',
      date: 'May.21, 2024',
      link: 'https://docs.goo...',
      targetOrg: '*',
      active: true,
    },
  ]
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Survey Dashboard</h1>
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <Button
            variant="outline"
            className="bg-green-500 text-white"
            onClick={() => setIsNewSurveyOpen(true)}
          >
            + Survey
          </Button>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search for content..."
              className="mr-2 rounded-md border px-3 py-2 dark:bg-gray-700"
            />
            <Button variant="outline" className="mr-2">
              Export selected
            </Button>
            <Button variant="outline" className="bg-red-500 text-white">
              Delete selected
            </Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2">
                <input type="checkbox" />
              </th>
              <th className="pb-2">Survey</th>
              <th className="pb-2">Date</th>
              <th className="pb-2">Link to Survey</th>
              <th className="pb-2">Target Org</th>
              <th className="pb-2">Activate/Deactivate</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey) => (
              <tr key={survey.id} className="border-b">
                <td className="py-2">
                  <input type="checkbox" />
                </td>
                <td className="py-2">{survey.name}</td>
                <td className="py-2">{survey.date}</td>
                <td className="py-2">
                  <a
                    href={survey.link}
                    className="text-blue-500 hover:underline"
                  >
                    {survey.link}
                  </a>
                </td>
                <td className="py-2">{survey.targetOrg}</td>
                <td className="py-2">
                  <button
                    className={`rounded px-2 py-1 ${
                      survey.active ? 'bg-green-500' : 'bg-red-500'
                    } text-white`}
                  >
                    {survey.active ? '✓' : '✗'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <nav className="inline-flex">
            {[...Array(11)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 ${
                  i === 9 ? 'bg-blue-500 text-white' : 'text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {isNewSurveyOpen && (
        <NewSurvey onClose={() => setIsNewSurveyOpen(false)} />
      )}
    </div>
  )
}

export default SurveyPage
