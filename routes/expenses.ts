import { Hono } from "hono";
import { z } from "zod";

export const expensesRoute = new Hono();

type Expense = {
  id: number;
  title: string;
  amount: number;
};

const createExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

expensesRoute
  .get("/", (c) => {
    return c.json({
      expenses: [],
    });
  })
  .post("/", async (c) => {
    const data = await c.req.json();

    const expense = createExpenseSchema.parse(data);

    console.log({ expense });

    return c.json({});
  });
