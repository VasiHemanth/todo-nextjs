import React from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TodoInput from "../AppComponents/todoInput";
import CustomCard from "../AppComponents/CustomCard";

import { cookies } from "next/headers";
import EnvAPI from "@/lib/EnvAPI";

export const dynamic = "force-dynamic";

export default async function Todo() {
  const serverSession = await getServerSession(authOptions);
  console.log("serverSession", serverSession);

  const url = EnvAPI();

  if (serverSession === null) {
    redirect("/auth/signin");
  } else {
    const cookieStore = cookies();

    const accessToken = cookieStore.get("access_token");

    console.log("access token", accessToken);

    const getTodos = await fetch(
      `${url}/api/get-todos?username=${serverSession.user.name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken.value,
        },
      }
    );

    const todos = await getTodos.json();

    return (
      <div className="flex flex-col items-center h-[90%] justify-between">
        <div className="m-2">
          {serverSession != undefined ? (
            <div className="my-2">
              <p className="py-2 text-center font-semibold">
                {` ${serverSession.user.name}'s list`}
              </p>
              <div>
                <TodoInput username={serverSession.user.name} />
              </div>
            </div>
          ) : (
            <p>no active session</p>
          )}
          <div>
            {todos.map((todo, i) => (
              <CustomCard todo={todo} key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
