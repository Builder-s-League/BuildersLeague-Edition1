'use client'
import NewSurvey from '@/components/NewSurvey'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { useState, useMemo, useEffect } from 'react'
import { Search } from 'lucide-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CellPopup from '@/components/CellPopup'
import { createBrowserClient } from '@/utils/supabase'
import { Survey } from '@/types/survey'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'

const SurveyPage = () => {
  const [isNewSurveyOpen, setIsNewSurveyOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [surveys, setSurveys] = useState<Survey[]>([])
  const supabase = createBrowserClient()
  const itemsPerPage = 5

  //const [surveyStatuses, setSurveyStatuses] = useState<Record<number, boolean>>({})

  useEffect(() => {
    async function fetchSurveys() {
      const { data, error } = await supabase.from('survey').select('*')

      if (error) {
        console.error('Error fetching surveys:', error)
      } else {
        setSurveys(data as any)
      }
    }

    fetchSurveys()
  }, [])

  const [selectedSurveys, setSelectedSurveys] = useState<number[]>([])

  const handleStatusChange = async (id: number, status: boolean) => {
    const { error } = await supabase
      .from('survey')
      .update({ status: status })
      .eq('id', id)

    if (error) {
      console.error('Error updating survey status:', error)
    } else {
      setSurveys((prevSurveys) =>
        prevSurveys.map((survey) =>
          survey.id === id ? { ...survey, status } : survey,
        ),
      )
    }
  }

  const paginatedSurveys = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return surveys.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, surveys])

  const totalPages = Math.ceil(surveys.length / itemsPerPage)

  const renderCell = (content: string, maxLength: number = 20) => {
    if (content === null || content === undefined) {
      return 'N/A'
    }
    if (content.length <= maxLength) {
      return content
    }
    return (
      <CellPopup content={content}>
        <span className="cursor-pointer">{content.slice(0, maxLength)}...</span>
      </CellPopup>
    )
  }

  const handleSelectSurvey = (id: number) => {
    setSelectedSurveys((prev) =>
      prev.includes(id)
        ? prev.filter((surveyId) => surveyId !== id)
        : [...prev, id],
    )
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSurveys(paginatedSurveys.map((survey) => survey.id))
    } else {
      setSelectedSurveys([])
    }
  }

  const exportSelectedSurveys = () => {
    const selectedSurveyData = surveys.filter((survey) =>
      selectedSurveys.includes(survey.id),
    )
    const csvContent = [
      ['ID', 'Name', 'Date', 'Link', 'Target Org', 'Active'],
      ...selectedSurveyData.map((survey) => [
        survey.id,
        survey.created_at,
        survey.link,
        survey.organization_id,
        survey.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'selected_surveys.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const deleteSelectedSurveys = async () => {
    if (selectedSurveys.length === 0) {
      return
    }

    const { error } = await supabase
      .from('survey')
      .delete()
      .in('id', selectedSurveys)

    if (error) {
      console.error('Error deleting surveys:', error)
    } else {
      setSurveys((prevSurveys) =>
        prevSurveys.filter((survey) => !selectedSurveys.includes(survey.id)),
      )
      setSelectedSurveys([])
    }
  }

  // useEffect(() => {
  //   if (surveys.length > 0) {
  //     setSurveyStatuses(
  //       surveys.reduce(
  //         (acc, survey) => ({ ...acc, [survey.id]: survey.status }),
  //         {},
  //       ),
  //     )
  //   }
  // }, [surveys])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Survey Dashboard</h1>
      <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="mb-4">
          <Dialog open={isNewSurveyOpen} onOpenChange={setIsNewSurveyOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full sm:w-auto">
                + Survey
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px]">
              <NewSurvey onClose={() => setIsNewSurveyOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex w-full items-center">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search for content..."
                className="w-full pr-10"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button
              variant="outline"
              className="ml-2 mr-2"
              onClick={exportSelectedSurveys}
            >
              Export selected
            </Button>
            <Button variant="destructive" onClick={deleteSelectedSurveys}>
              Delete selected
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedSurveys.length === paginatedSurveys.length &&
                    paginatedSurveys.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Survey</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Link to Survey</TableHead>
              <TableHead>Target Org</TableHead>
              <TableHead>Activate/Deactivate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSurveys.map((survey) => (
              <TableRow key={survey.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSurveys.includes(survey.id)}
                    onCheckedChange={() => handleSelectSurvey(survey.id)}
                  />
                </TableCell>
                <TableCell>{renderCell(survey.id + '')}</TableCell>
                <TableCell>{survey.created_at}</TableCell>
                <TableCell>{renderCell(survey.link)}</TableCell>
                <TableCell>{renderCell(survey.organization_id + '')}</TableCell>
                <TableCell>
                  <Switch
                    checked={survey.status}
                    onCheckedChange={(checked) =>
                      handleStatusChange(survey.id, checked)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-center">
          <nav className="inline-flex">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={i + 1 === currentPage ? 'default' : 'outline'}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default SurveyPage
