import Link from 'next/link'
import NextLogo from './NextLogo'
import SupabaseLogo from './SupabaseLogo'

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="flex items-center justify-center gap-8">
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <h1 className="sr-only">Reconciliation Road Challenge</h1>
      <p className="mx-auto max-w-xl text-center text-3xl !leading-tight lg:text-4xl">
        A fresh adventure{' '}
        <a
          href="https://github.com/Builder-s-League/BuildersLeague-Edition1"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          begins
        </a>
        !
      </p>
      <nav>
        <Link href="/about">About</Link>
      </nav>
      <div className="my-8 w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent p-[1px]" />
    </div>
  )
}
