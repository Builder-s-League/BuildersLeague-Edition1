<h1 align="center">⚡ Builder's League: Edition 1 ⚡</h1>

<h3 align="center">
 Reconciliation Road Challenge
</h3>

<div align="center">

<img alt="GitHub License" src="https://img.shields.io/github/license/michaeltroya/supa-next-starter">
</div>

<br/>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#documentation"><strong>Documentation</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
</p>
<br/>

## Features

- ⚡️ Next.js 14 (App Router)
- 💚 Supabase w/ supabase-ssr - Works across the entire [Next.js](https://nextjs.org) stack (App Router, Pages Router, Client, Server, Middleware, It just works!)
- ⚛️ React 18
- ⛑ TypeScript
- 📦 npm - package manager
- 🎨 [Tailwind](https://tailwindcss.com/)
- 🔌 [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
- 🧪 Jest w/SWC + React Testing Library - Unit tests for all of your code.
- 🎛️ [MSW](https://mswjs.io/)v2 - Intercept requests inside your tests (set up for testing only)
- 🪝[TanStackQuery](https://tanstack.com/query/v5)v5 - The best way to fetch data on the client
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- 👷 Github Actions — Run Type Checks, Tests, and Linters on Pull Requests
- 🗂 Path Mapping — Import components or images using the `@` prefix
- ⚪⚫ Dark mode - Toggle theme modes with [next-themes](https://github.com/pacocoursey/next-themes)
- ✨ Next Top Loader - Render a pleasent top loader on navigation with [nextjs-toploader](https://github.com/TheSGJ/nextjs-toploader)
- 🔋 Lots Extras - Next Bundle Analyzer, Vercel Analytics, Vercel Geist Font

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

3. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

# Documentation

### Requirements

- Node.js >= 18.17.0

### Scripts

- `npm run dev` — Starts the application in development mode at `http://localhost:3000`.
- `npm run build` — Creates an optimized production build of your application.
- `npm run start` — Starts the application in production mode.
- `npm run type-check` — Validate code using TypeScript compiler.
- `npm run lint` — Runs ESLint for all files in the `src` directory.
- `npm run format-check` — Runs Prettier and checks if any files have formatting issues.
- `npm run format` — Runs Prettier and formats files.
- `npm run test` — Runs all the jest tests in the project.
- `npm run test:ci` — Runs all the jest tests in the project, Jest will assume it is running in a CI environment.
- `npm run analyze` — Builds the project and opens the bundle analyzer.

### Paths

TypeScript is pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/ui/Button'

// To import images or other files from the public folder
import avatar from '@/public/avatar.png'
```

## Appsmith Dashboards

We have included a set of Appsmith dashboards that can be run locally. These dashboards provide a range of data visualizations and are highly customizable.

### Quick Start

To get started with the Appsmith dashboards:

1. Ensure Docker is installed.
2. Navigate to the `appsmith_dashboards` folder.
3. Follow the detailed instructions provided in the guide within that folder.

### Detailed Guide

For detailed instructions on running and contributing to the Appsmith dashboards, please refer to the [Appsmith Dashboards Guide](./appsmith_dashboards/README.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.

## Feedback and issues

Please file feedback and issues [here](https://github.com/michaeltroya/supa-next-starter/issues).
