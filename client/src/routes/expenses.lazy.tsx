import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { api } from "~/lib/api";

export const Route = createLazyFileRoute("/expenses")({
  component: Expenses,
});

async function getAllExpenses() {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw new Error("Server Error");
  }

  const data = res.json();
  return data;
}

function Expenses() {
  const { isPending, isError, error, data } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses,
  });

  if (isError) return "An Error has occured: " + error.message;
  return (
    <div>
      {isPending
        ? "..."
        : data.expenses.map((expense) => (
            <div className=" flex">
              <p>{expense.title}</p> <p>{expense.amount}</p>
            </div>
          ))}
    </div>
  );
}
