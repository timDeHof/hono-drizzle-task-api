import { testClient } from "hono/testing";
import createApp from "@/libs/create-app";
import router from "./tasks.index";
import { describe, beforeEach, it } from "node:test";

describe("Tasks API", () => {
  // Setup common test client
  let client: ReturnType<typeof testClient>;

  beforeEach(() => {
    client = testClient(createApp().route("/", router));
  });

  describe("GET /tasks", () => {
    it("returns a list of tasks", async () => {
      // Act
      const response = await client.tasks.$get();
      const result = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expectTypeOf(result).toBeArray();
    });
  });

  describe("GET /tasks/:id", () => {
    it("returns 422 when invalid ID is provided", async () => {
      // Arrange
      const invalidId = "wat";

      // Act
      const response = await client.tasks[":id"].$get({
        param: { id: invalidId }
      });

      // Assert
      expect(response.status).toBe(422);
    });

    // Additional test cases you might want to add
    it("returns 404 when task is not found", async () => {
      // Arrange
      const nonExistentId = "123";

      // Act
      const response = await client.tasks[":id"].$get({
        param: { id: nonExistentId }
      });

      // Assert
      expect(response.status).toBe(404);
    });
  });
});