import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white p-8">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center text-5xl font-bold tracking-tight">
          About Page
        </h1>
        <p className="text-md max-w-lg text-center leading-relaxed text-gray-400">
          App Description
        </p>
        <Link href="/setting/app-tour">
          <button className="hover rounded-lg border border-gray-500 bg-transparent px-8 py-3 font-semibold shadow-md transition duration-300 hover:border-gray-700 hover:bg-gray-700 focus:outline-none">
            Help
          </button>
        </Link>
        <section className="mt-8 w-full max-w-2xl">
          <div className="flex aspect-video items-center justify-center rounded-lg border border-gray-500 bg-gray-800 shadow-lg">
            <iframe
              className="rounded-lg"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Rickroll App Tour Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  )
}
