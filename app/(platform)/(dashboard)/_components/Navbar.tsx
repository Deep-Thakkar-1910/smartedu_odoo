"use client";
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { useSession } from 'next-auth/react'
import { UserCircle2 } from 'lucide-react'

const Navbar = () => {

    const {data:session}= useSession();
    const name = session  && session?.user?.name?.split(" ");
    const AvatarName =
      name && name.length > 1
        ? name[0][0]?.toUpperCase() + name[1][0]?.toUpperCase()
        : name && name[0][0]?.toUpperCase();
  

  return (
    <>
    <header className="sticky top-0 z-40 border-b bg-background px-4 py-3 sm:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <BookIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Edify</span>
          </Link>
          <nav className="hidden items-center gap-4 sm:flex">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Dashboard
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Courses
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Assessments
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Resources
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Collaborate
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="sm:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
            <Avatar>
          <AvatarImage src={session?.user?.image!} />
          <AvatarFallback>
            {AvatarName ?? <UserCircle2 className="size-full" />}
          </AvatarFallback>
        </Avatar>
          </div>
        </div>
      </header>
    </>
)
}



function BookIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
   )
}

function MenuIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }

export default Navbar