"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeftFromLine, Moon, Sun, UserCircle2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
const ProfileDropDown = () => {
  const { data: session } = useSession();

  // extracting first name and last name initals from the user name
  const name = session?.user?.name?.split(" ");
  const AvatarName =
    name && name.length > 1
      ? name[0][0]?.toUpperCase() + name[1][0]?.toUpperCase()
      : name && name[0][0]?.toUpperCase();
  //   return the dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`rounded-full outline-0 ${session?.user ? "" : "lg:hidden"}`}
      >
        <Avatar>
          <AvatarImage src={session?.user?.image!} />
          <AvatarFallback>
            {AvatarName ?? <UserCircle2 className="size-full" />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">Profile</DropdownMenuLabel>
        <DropdownMenuSeparator className={`${session?.user ? "" : "hidden"}`} />
        {session?.user?.email && (
          <DropdownMenuItem className="overflow-x-auto text-sky-700 dark:text-sky-500">
            <p className="text-balance">{session?.user?.email}</p>
          </DropdownMenuItem>
        )}

        {session?.user && (
          <>
            <DropdownMenuSeparator />
            <Link href={"/api/auth/signout"}>
              <DropdownMenuItem>
                <ArrowLeftFromLine className="mr-2 size-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
