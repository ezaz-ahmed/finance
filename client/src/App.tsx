"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";
import { api } from "~/lib/api";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await api.expenses["total-spents"].$get();
      const total = await res.json();

      setTotalSpent(total.total);
    }

    fetchTotalSpent();
  }, []);

  return (
    <main className=" flex justify-center">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Total Spents</CardTitle>
          <CardDescription>{totalSpent}</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};

export default App;
