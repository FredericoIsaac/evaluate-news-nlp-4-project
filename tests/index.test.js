
const app = require("../src/server/index");
const supertest = require('supertest');
const request = supertest(app);

    it("post /add status 200", async done =>{
        const response = await require(app)
        .post("http://localhost:5500/add")
        .send({
            url: "https://www.bucketlistly.blog/posts/best-travel-blogs-design"
        });
        expect(response.statusCode).toBe(200)
        done()
    });


    it("get http://localhost:5500/all has status 200", async done =>{
        const response = await require(app)
        .get("http://localhost:5500/all");
        expect(response.statusCode).toBe(200);
        done();
    });

