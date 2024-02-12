"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TodoInput({ username }) {
  const [submit, setSubmit] = useState("");

  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  console.log("data", data);

  const handleChange = (e) => {
    setSubmit(e.target.value);
  };

  const handleSubmit = async () => {
    if (submit.length == 0) return;

    const submitTodo = await fetch(
      `http://localhost:8000/api/create-todo?username=${username}&todo-data=${submit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data.user.access_token,
        },
      }
    );

    const submitTodoResponse = await submitTodo.json();

    toast({
      description: submitTodoResponse.message,
    });

    router.refresh();
  };

  console.log("submit ", submit);

  return (
    <div className="flex gap-2 items-center">
      <Input placeholder="Enter todo" value={submit} onChange={handleChange} />
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
