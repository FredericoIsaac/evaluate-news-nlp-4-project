const app = require("../src/server/index");
require('supertest')


describe("post /add", () =>{
    test.only("status 200", async () =>{
        const response = await require(app).post("/add")
        .send({
            url: "https://www.bucketlistly.blog/posts/best-travel-blogs-design"
        });
        expect(response.statusCode).toBe(200)
    });
});

describre("get /all", () =>{
    test("has status 200", async () =>{
        const response = await request(app).get("/all");
        expect(response.statusCode).toBe(200);
    });
});

