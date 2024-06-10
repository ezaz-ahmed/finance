"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getTotalSpent() {
  const res = await api.expenses["total-spents"].$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }

  const data = res.json();
  return data;
}

const App = () => {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (isPending) return "Loading...";

  if (isError) return "An Error has occured: " + error.message;

  return (
    <main className=" flex justify-center">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Total Spents</CardTitle>
          <CardDescription>{isPending ? "..." : data.total}</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default App;
