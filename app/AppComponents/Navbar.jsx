"use client";
import React from "react";

import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";

export default function Navbar() {
  const { data } = useSession();

  console.log("navbar session", data);

  return (
    <div className="w-full h-14 border-b">
      <div className="flex items-center justify-between mx-5">
        <div className="font-bold">Todo App</div>
        {data && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full cursor-pointer">
                <AvatarFallback>{data.user.name[0]} </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col p-1">
                <p className="text-sm font-medium leading-none">
                  {data.user.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {data.user.email}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <span className="flex items-center justify-between w-full">
                  Log out
                  <LogOut className="w-4 h-4" />
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
