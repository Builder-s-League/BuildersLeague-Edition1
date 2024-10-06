import { Button } from '@/components/ui/button'

import { Check, X } from 'lucide-react'
import { ArrowUpDown } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { notes as initialNotes, Notes } from '@/mocks/Notes'
import { useEffect, useState } from 'react'
import { DataTable } from './DataTable'
export function DemoPage() {
  const [data, setData] = useState<Notes[]>([])
  const [currentUser, setCurrentUser] = useState<{
    id: string
    name: string
    email: string
    contact_info: string
    admin_id: string
    role: 'ADMIN' | 'ORG'
  }>()

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData()
      setData(fetchedData)
    }
    fetchData()
  }, [])
  async function getData(): Promise<Notes[]> {
    // Fetch data from your API here.
    // For now, return the initial mock data.
    return initialNotes
  }

  // Function to handle approve
  const handleApprove = (id: string) => {
    setData((prevData) =>
      prevData.map((note) => {
        let r = note
        let k =
          currentUser?.role == 'ADMIN'
            ? 'is_approved_cbh'
            : currentUser?.role == 'ORG' && 'is_approved_org'

        return note.id === id ? { ...note, k: true } : note
      }),
    )
  }

  // Function to handle reject
  const handleReject = (id: string) => {
    setData((prevData) =>
      prevData.map((note) => {
        let r = note
        let k =
          currentUser?.role == 'ADMIN'
            ? 'is_approved_cbh'
            : currentUser?.role == 'ORG' && 'is_approved_org'

        return note.id === id ? { ...note, k: false } : note
      }),
    )
  }

  // Define columns with updated `is_approved_cbh` cell
  const updatedColumns: ColumnDef<Notes>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'note',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Note
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'topic',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Linked Content
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'author',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Author
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'note_content.content',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Report Content
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: 'is_approved_cbh',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Keep
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const isActive = row.original.is_approved_cbh

        const handleApproveClick = () => handleApprove(row.original.id)
        const handleRejectClick = () => handleReject(row.original.id)

        return (
          <div className="flex space-x-2">
            <Button
              variant={'green'}
              size="xs"
              onClick={handleApproveClick}
              disabled={isActive}
            >
              <Check />
            </Button>
            <Button variant={'red'} size="xs" disabled={!isActive}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size={'xs'}>
                    {' '}
                    <X />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Content</AlertDialogTitle>
                    <AlertDialogDescription>
                      {row.original.note_content.content}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Resaon for denial/removal?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Textarea />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={updatedColumns} data={data} />
    </div>
  )
}
