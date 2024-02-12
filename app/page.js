import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col gap-5">
      Welcome to Next js todo
    <Button>
      <Link href="/todo-data">Open App</Link>
    </Button>

      </div>
  </div>
  );
}
