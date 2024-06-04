import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();
app.use("*", logger());

app.get("/healthcheck", (c) => {
  return c.json({
    status: "OK",
    message: "Service is running",
    timestamp: new Date().toISOString(),
  });
});

app.route("/api/expenses", expensesRoute);

export default app;
