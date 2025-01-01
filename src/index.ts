import { Hono } from "hono";
import { healthRoute } from "./routes/healthRoute";

const app = new Hono();

// Menggunakan rute modular
app.route("/api", healthRoute);

// Custom port dengan nilai default 3000
const PORT = Number(process.env.PORT_SERVER) || 3000;

Bun.serve({
  fetch: app.fetch, 
  port: PORT, 
});

console.log(`Server is running on http://localhost:${PORT}`);
