import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { insertTaskSchema, patchSchema, selectTasksSchema } from "@/db/schema";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { notFoundSchema } from "@/libs/constants";

const tags = ["Tasks"];

export const list = createRoute({
  tags,
   path: "/tasks",
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
     z.array(
     selectTasksSchema), "List of tasks"
    ),
  },
});

export const create = createRoute({
  tags,
   path: "/tasks",
  method: "post",
  request: {
    body: jsonContentRequired(
     insertTaskSchema, "create task"
    )
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
     selectTasksSchema, "created task"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
     createErrorSchema(insertTaskSchema), "The validation error(s)")

  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
    request: {
    params: IdParamsSchema,
    },
  tags,

  responses: {
    [HttpStatusCodes.OK]: jsonContent(

     selectTasksSchema, "Requested task"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
     createErrorSchema(IdParamsSchema), "Invalid Id error"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
    notFoundSchema
, "Task not found"
    ),
  },
});

export const patch = createRoute({
  tags,
   path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
     patchSchema, "update task"
    )
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
     selectTasksSchema, "updated task"
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf([
      createErrorSchema(patchSchema),
      createErrorSchema(IdParamsSchema)
    ], "The validation error(s)"
    ),
     [HttpStatusCodes.NOT_FOUND]: jsonContent(
    notFoundSchema
, "Task not found"
    ),
  },
});

export const remove = createRoute({
  tags,
   path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
     description: "Task deleted"
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(

      createErrorSchema(IdParamsSchema)
    , "Invalid Id error"
    ),
     [HttpStatusCodes.NOT_FOUND]: jsonContent(
    notFoundSchema
, "Task not found"
    ),
  },
});



export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;