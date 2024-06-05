import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const expensesRoute = new Hono();

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });
const FakeExpenses: Expense[] = [];

expensesRoute
  .get("/", (c) => {
    return c.json({
      expenses: FakeExpenses,
    });
  })
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const expense = c.req.valid("json") as Omit<Expense, "id">;
    const newExpense: Expense = {
      id: FakeExpenses.length + 1,
      ...expense,
    };

    FakeExpenses.push(newExpense);
    console.log({ newExpense });

    return c.json({ expense: newExpense });
  })
  .get("/:id([0-9]+)", (c) => {
    const id = Number.parseInt(c.req.param("id")!, 10);
    const expense = FakeExpenses.find((exp) => exp.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .put("/:id([0-9]+)", zValidator("json", createExpenseSchema), (c) => {
    const id = Number.parseInt(c.req.param("id")!, 10);
    const updatedData = c.req.valid("json") as Omit<Expense, "id">;

    const expenseIndex = FakeExpenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      return c.notFound();
    }

    FakeExpenses[expenseIndex] = { id, ...updatedData };

    return c.json({ expense: FakeExpenses[expenseIndex] });
  })
  .delete("/:id([0-9]+)", (c) => {
    const id = Number.parseInt(c.req.param("id")!, 10);
    const expenseIndex = FakeExpenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      return c.notFound();
    }

    FakeExpenses.splice(expenseIndex, 1);

    return c.json({ message: "Expense deleted successfully" });
  });

export default expensesRoute;
