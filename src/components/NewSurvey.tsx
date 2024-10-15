import React from 'react'
interface NewSurveyProps {
  onClose: () => void
}
const NewSurvey: React.FC<NewSurveyProps> = ({ onClose }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">New Survey</h1>
      <button
        className="rounded-lg bg-gray-200 p-2 shadow-md hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        onClick={onClose}
      >
        Back
      </button>

      <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
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
            />
            <input
              type="time"
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <span className="block text-sm font-medium">Target Org</span>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" checked className="mr-2" /> *
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> ACME Inc
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Ori.Gatou
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> RRC
            </label>
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
