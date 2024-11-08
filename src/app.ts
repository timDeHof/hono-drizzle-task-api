import createApp from "@/libs/create-app";

import configureOpenApi from "@/libs/configure-open-api";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";

const app = createApp();
const routes = [
  index, tasks,
] as const;

configureOpenApi(app);
routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
