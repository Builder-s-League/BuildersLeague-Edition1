import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { BadgeCheck, Check, Search, X } from 'lucide-react'
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

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table as TTable } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { notes as initialNotes, Notes } from '@/mocks/Notes'
import { useEffect, useState } from 'react'

export const Report = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <DemoPage />
      </div>
    </div>
  )
}

async function getData(): Promise<Notes[]> {
  // Fetch data from your API here.
  // For now, return the initial mock data.
  return initialNotes
}

function DemoPage() {
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex justify-between py-4">
        <SearchInput
          placeholder="Filter topic..."
          value={(table.getColumn('topic')?.getFilterValue() as string) ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            table.getColumn('topic')?.setFilterValue(event.target.value)
          }}
        />
        <div className="flex gap-2">
          <Button variant={'outline'}>Export Selected</Button>
          <Button variant={'outline'}>Delete Selected</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

interface DataTablePaginationProps<TData> {
  table: TTable<TData>
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

const ReportColumns = () => {}

const SearchInput = ({
  placeholder,
  onChange,
  value,
}: {
  placeholder: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
}) => {
  return (
    <div className="relative flex w-full max-w-sm items-center space-x-2">
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Button
        type="button"
        variant={'outline'}
        size={'icon'}
        className="absolute right-0 top-0"
        onClick={() => {
          /* Optional: Handle search button click */
        }}
      >
        <Search size={15} />
      </Button>
    </div>
  )
}
