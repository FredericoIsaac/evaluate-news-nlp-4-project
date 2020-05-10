const app = require("../src/server/index");


describe("sentiment function", () =>{
    test.only("SDK sentiment running ok", async () =>{
        const textInput = "John is a very good football player!";
        expect(await sentiment(textInput)).toBe(true)
    })
});



