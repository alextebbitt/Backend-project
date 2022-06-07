const request = require("supertest");
const User = require("../models/User");
const app = require("../index.js");
const jwt = require("jsonwebtoken");
// const { token } = require("../index.js");
let configFile = process.env.NODE_ENV + ".env";

require("dotenv").config({ path: configFile });
let jwt_secret = process.env.JWT_SECRET;

describe("testing/users", () => {
    let token;
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
    test("Confirm a user", async () => {

        const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
            expiresIn: "48h",
        });
        const res = await request(app)
            .get("/users/confirm/" + emailToken)
            .expect(201);
        expect(res.text).toBe("User confirmed");
    });

    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send({ email: "test@example.com", password: "123456" })
            .expect(200);
        token = res.body.token;
    });
    test("Get users", async () => {
        const res = await request(app)
            .get("/users")
            .expect(200)
        //.set({ Authorization: token });
        expect(res.body).toBeInstanceOf(Array);
    });

    test("Update a user record", async () => {
        console.warn(token)

        const updateUser = { name: "Updated name" };
        const user = await User.findOne({ name: "Username" })
        const res = await request(app)
            .put("/users/id/" + user._id)
            .send(updateUser)
            .set({ Authorization: token })
            .expect(200);
        token = res.body.token;
        expect(res.body.message).toBe("User successfully updated");

    });
});

