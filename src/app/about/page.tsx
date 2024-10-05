import Link from 'next/link'

export default function AboutPage() {
  return (
    <div>
      <header>
        <div>Logo</div>
        <h1>About Page</h1>
      </header>
      <main>
        <section>
          <h2>App Description</h2>
          <p>This is a description of the app.</p>
        </section>
        <section>
          <Link href="/tour">
            <button>Help</button>
          </Link>
        </section>
      </main>
    </div>
  )
}
