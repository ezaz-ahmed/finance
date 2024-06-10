import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();
app.use("*", logger());

// app.get("/healthcheck", (c) => {
//   return c.json({
//     status: "OK",
//     message: "Service is running",
//     timestamp: new Date().toISOString(),
//   });
// });

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
export type AppType = typeof apiRoutes;
