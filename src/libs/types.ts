import type { PinoLogger } from "hono-pino";

import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenApi = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;