import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black p-8 text-white">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white">
        Logo
      </div>
      <div className="flex flex-col items-center justify-center space-y-8">
        <h1 className="text-center text-3xl font-bold">About Page</h1>
        <p className="mb-2 text-xl">App Description</p>
        <Link href="/setting/app-tour">
          <button className="rounded border border-white px-4 py-2 transition-colors hover:bg-white hover:text-black">
            Help
          </button>
        </Link>
        <section>
          <div className="flex aspect-video items-center justify-center rounded border border-white p-4">
            App Tour Video
          </div>
        </section>
      </div>
    </div>
  )
}
