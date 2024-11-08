import type { AppOpenApi } from "./types";
import packageJSON  from "../../package.json";
import { apiReference } from "@scalar/hono-api-reference";


export default function configureOpenApi(app: AppOpenApi) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
    },
  });

  app.get(
  '/reference',
    apiReference({
      theme: 'solarized',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
    spec: {
      url: '/doc',
    },
  }),
)
}