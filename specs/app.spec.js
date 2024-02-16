import request from "supertest";
const app = "https://bookstore.demoqa.com";

describe("Bookstore API Tests", () => {
  test("Создание пользователя c ошибкой, логин уже используется", async () => {
    const response = await request(app)
      .post("/Account/v1/User")
      .send({ userName: "testuser", password: "Password123!" });

    expect(response.status).toBe(406);
    expect(response.body.message).toBe("User exists!");
  });

  test("Создание пользователя c ошибкой, пароль не подходит", async () => {
    const response = await request(app)
      .post("/Account/v1/User")
      .send({ userName: "newuser", password: "123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.",
    );
  });

  test("Создание пользователя успешно", async () => {
    const response = await request(app)
      .post("/Account/v1/User")
      .send({
        userName: `user${Math.floor(Math.random() * 1000)}`,
        password: "strongPassword123!",
      });

    expect(response.status).toBe(201);
  });

  test("Генерация токена c ошибкой", async () => {
    const response = await request(app)
      .post("/Account/v1/GenerateToken")
      .send({ userName: "newuser9994745", password: "123" });

    //тут почему то сервис при неправильном вводе данных отдает код 200, но не дает токен, поэтому проверка без статуса
    expect(response.body.token).toBeFalsy();
  });

  test("Генерация токена успешно", async () => {
    const response = await request(app)
      .post("/Account/v1/GenerateToken")
      .send({ userName: "newuser9994745", password: "strongPassword123!" });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });
});
