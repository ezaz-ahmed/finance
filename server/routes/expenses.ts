import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const createExpenseSchema = expenseSchema.omit({ id: true });
const fakeExpenses: Expense[] = [];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .get("/total-spents", (c) => {
    const totalSum = fakeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return c.json({ total: totalSum });
  })
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const expense = c.req.valid("json") as Omit<Expense, "id">;
    const newExpense: Expense = {
      id: fakeExpenses.length + 1,
      ...expense,
    };

    fakeExpenses.push(newExpense);
    console.log({ newExpense });

    return c.json({ expense: newExpense });
  })
  .get("/:id{[0-9]+}", (c) => {
    console.log({
      param: c.req.param("id"),
    });

    const id = Number.parseInt(c.req.param("id")!, 10);

    console.log({ id });

    const expense = fakeExpenses.find((exp) => exp.id === id);

    if (!expense) {
      return c.notFound();
    }

    return c.json({ expense });
  })
  .put("/:id{[0-9]+}", zValidator("json", createExpenseSchema), (c) => {
    const id = Number.parseInt(c.req.param("id")!, 10);
    const updatedData = c.req.valid("json") as Omit<Expense, "id">;

    const expenseIndex = fakeExpenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      return c.notFound();
    }

    fakeExpenses[expenseIndex] = { id, ...updatedData };

    return c.json({ expense: fakeExpenses[expenseIndex] });
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id")!, 10);
    const expenseIndex = fakeExpenses.findIndex((exp) => exp.id === id);
    if (expenseIndex === -1) {
      return c.notFound();
    }

    fakeExpenses.splice(expenseIndex, 1);

    return c.json({ message: "Expense deleted successfully" });
  });

export default expensesRoute;
