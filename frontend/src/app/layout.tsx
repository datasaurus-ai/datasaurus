import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SidebarNav } from "@/components/sidebar-nav"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryProvider } from '@/app/providers/react-query'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Datasaurus',
  description: 'Get insights from your data',
}

const sidebarNavItems = [
  {
    title: "Create Pipeline",
    href: "/create-pipeline",
  },
  {
    title: "View Pipelines",
    href: "/pipelines-list",
  },
  
]


export default function RootLayout({children,}: {children: React.ReactNode}) {

  // const queryClient = new QueryClient()

  return (
    <html lang="en">
    <body>

      <div className="hidden space-y-6 p-10 pb-16 md:block">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <ReactQueryProvider>{children}</ReactQueryProvider>
          
        </div>
      </div>
      </div>
      </body>
    </html>
  )
}
