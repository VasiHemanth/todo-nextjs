import React from "react";

import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CheckCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Badge } from "@/components/ui/badge";
import { formatISODatetoDDMMYYY } from "@/utils/helper";

export default function CustomCard({ todo }) {
  return (
    <Card className="my-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col justify-center">
          <CardTitle>{todo.todo_name}</CardTitle>
          <CardDescription>{todo.description}</CardDescription>
        </div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="px-3 py-1">
                  <CheckCheck className="w-5 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Submit Todo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">
          {formatISODatetoDDMMYYY(todo.created_at)}
        </Badge>
      </CardContent>
    </Card>
  );
}
