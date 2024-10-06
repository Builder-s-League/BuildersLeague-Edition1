import { Resource } from '@/components/Resource'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export default function Page() {
  // const supabase = createBrowserClient()

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await supabase.from('notes').select()
  //     setNotes(data)
  //   }
  //   getData()
  // }, [])

  return (
    <>
      <nav className="flex h-28 w-full items-center justify-between bg-gray-900 px-6 py-4 text-white">
        <button className="text-white focus:outline-none">
          <HamburgerMenuIcon className="h-8 w-8" />
        </button>
        <h1 className="text-3xl">Resource Detail</h1>
        <button className="text-smp rounded-full bg-white px-4 py-2 text-black">
          Feedback
        </button>
      </nav>
      <Resource />
    </>
  )
}
