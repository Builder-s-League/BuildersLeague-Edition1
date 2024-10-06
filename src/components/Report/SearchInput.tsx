import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
export const SearchInput = ({
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
