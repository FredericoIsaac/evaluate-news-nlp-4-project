const app = require("../src/server/index");


describe("sentiment function", () =>{
    test("SDK sentiment running ok", async () =>{
        const text = "John is a very good football player!";
        expect(await sentiment(text)).toBe(true)
    })
});



