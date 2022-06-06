const request = require("supertest");
const User = require("../models/User");
const app = require("../index.js");
console.log("app is" + app);
describe("testing/users", () => {
    const user = {
        name: "Username",
        email: "test@example.com",
        password: "123456",
        role: "user",
        confirmed: false,
    };

    test("Create a user", async () => {
        const res = await request(app)
            .post("/users")
            .send(user)
            .expect(201);

        const sentUser = {
            name: "Username",
            email: "test@example.com",
            createdAt: res.body.user.createdAt,
            updatedAt: res.body.user.updatedAt,
        };

        const newUser = res.body.user;
        const statusCode = res.statusCode;
        expect(newUser).toEqual(sentUser);
        expect(res.statusCode).toEqual(201);
    });

    afterAll(() => {
        return User.deleteMany();
    });
    describe("testing/users", () => {
        let token;
        test("Login a user", async () => {
            const res = await request(app)
                .post("/users/login")
                .send({ email: "test@example.com", password: "123456" })
                .expect(200);
            token = res.body.token;

        });

    });
});