
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import { ReactNode } from 'react'

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default function Layout({ children }:{children:ReactNode}) {
  return (
   <>
        {children}
    </>
  )
}
