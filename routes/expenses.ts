import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const expensesRoute = new Hono();

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>

const createExpenseSchema = expenseSchema.omit({id: true})

expensesRoute
  .get("/", (c) => {
    return c.json({
      expenses: [],
    });
  })
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const expense = c.req.valid("json");

    console.log({ expense });

    return c.json({});
  })
  .get("/:id([0-9]+)", (c) => {
  const id = Number.parseInt(c.req.param("id"), 10);

  const expense = "something"; 

  if (!expense) {
    return c.notFound();
  }

  return c.json({ expense });
})
  .put("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
  });
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
  });
