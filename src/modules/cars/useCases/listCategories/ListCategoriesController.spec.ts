import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("List categories", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, is_admin, driver_license)
      VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XXXXXX')`
    );
  });

  afterAll(async () => {
    // await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });
    const { token } = responseToken.body;
    let response = await request(app)
      .post("/categories")
      .send({
        name: "Categories Supertest",
        description: "Categories Supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);

    response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");

    expect(response.body[0].name).toBe("Categories Supertest");
    expect(response.body[0].description).toBe("Categories Supertest");
  });
});
