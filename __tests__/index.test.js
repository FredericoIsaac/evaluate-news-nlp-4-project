
const app = require("../src/server/index");
const supertest = require('supertest');
const request = supertest(app);

  
        it("get http://localhost:5500/all has status 200", done => {
            request.get("/all")
            .then((res) =>{
                const status = res.statusCode
                expect(status).toBe(200);
                done();
            })
            .catch((err) => done(err));
        });
       

        it("post /add status 200", done => {
            request.post("/add")
            .send({
                url: "https://www.bucketlistly.blog/posts/best-travel-blogs-design"
            })
            .then((res) => {
                const statusPost = res.statusCode;
                expect(statusPost).toBe(200)
                done()
            })
            .catch((err) => done(err));
        });
        