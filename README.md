# Next.js 16 Tutorial Project

A modern full-stack application built with Next.js 16, featuring real-time capabilities, authentication, and a beautiful UI.

## Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org)** - React framework with App Router
- **[React 19](https://react.dev)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com)** - Accessible component primitives
- **[Lucide React](https://lucide.dev)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support

### Backend & Database
- **[Convex](https://convex.dev)** - Real-time backend-as-a-service
- **[Better Auth](https://www.better-auth.com)** - Modern authentication solution
- **[@convex-dev/presence](https://www.npmjs.com/package/@convex-dev/presence)** - Real-time user presence

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com)** - Performant form handling
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

## Features

- Authentication with Better Auth
- Real-time data synchronization with Convex
- User presence tracking
- Posts and comments system
- Server Actions for data mutations
- Dark mode support
- Fully responsive design
- Type-safe API with TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ installed
- pnpm package manager (or npm/yarn/bun)
- A Convex account ([Sign up free](https://convex.dev))

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd nextjs-16-tutorial-yt
```

2. Install dependencies

```bash
pnpm install
```

3. Set up environment variables

Create a [.env.local](.env.local) file in the root directory:

```env
# Add your environment variables here
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
```

4. Run the development server

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextjs-16-tutorial-yt/
├── app/                      # Next.js App Router
│   ├── (shared-layout)/     # Shared layout group
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── schemas/             # Validation schemas
│   ├── actions.ts           # Server Actions
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # Reusable UI components
├── convex/                  # Convex backend
│   ├── auth.ts             # Auth configuration
│   ├── posts.ts            # Posts queries/mutations
│   ├── comments.ts         # Comments queries/mutations
│   ├── presence.ts         # Presence tracking
│   └── schema.ts           # Database schema
├── lib/                     # Utility functions
└── public/                  # Static assets
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Key Concepts

### Convex Backend

This project uses Convex as a real-time backend. Convex functions are defined in the [convex/](convex/) directory and automatically sync data to the frontend.

### Server Actions

Server Actions are used for data mutations, providing a type-safe way to handle form submissions and user interactions.

### Real-time Presence

User presence is tracked using [@convex-dev/presence](https://www.npmjs.com/package/@convex-dev/presence), showing who's currently online.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Convex Documentation](https://docs.convex.dev)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

### Configure Convex

1. Deploy your Convex backend:
   ```bash
   npx convex deploy
   ```

2. Add environment variables to your Vercel project with the Convex deployment URL

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
