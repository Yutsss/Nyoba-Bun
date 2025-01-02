import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { InternalServerError } from './errors';
import { healthRoute, userRoute } from './routes';
import { errorResponse } from './utils/api-response';

export const app = new Hono();

app.use(
  '*',
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.route('/api', healthRoute);
app.route('/api/users', userRoute);

const PORT = Number(process.env.PORT_SERVER) || 3000;

if (!PORT) {
  throw new InternalServerError();
}

app.onError(async (error, c) => errorResponse(c, error));

Bun.serve({
  fetch: app.fetch,
  port: PORT,
});

console.log(`Server is running on http://localhost:${PORT}`);
