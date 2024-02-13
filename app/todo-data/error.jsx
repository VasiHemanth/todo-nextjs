"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function Error({ error, reset }) {
  const router = useRouter();

  console.error("error object", error);

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full h-[80%] bg-gray-200">
      <p>An error occured while fetching the data. Try again</p>
      <div className="pt-5">
        <Button className="mr-2" onClick={() => reset()}>
          Try Again
        </Button>
        <Button onClick={signOut}>Go Back</Button>
      </div>
    </div>
  );
}
