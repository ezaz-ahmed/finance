import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono();
app.use("*", logger());

app.get("/healthcheck", (c) => {
  return c.json({
    status: "OK",
    message: "Service is running",
    timestamp: new Date().toISOString(),
  });
});

export default app;
