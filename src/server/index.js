var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
require("dotenv").config();

const app = express()

const bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

const cors= require("cors");
        app.use(cors());



app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

var AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: process.env.APP_ID,
  application_key: process.env.APP_KEY
});

console.log(textapi);

app.get("/sentiment/:text", async (request,response) => {
    console.log(request.params);
    const textInput = request.params.text;
    console.log(textInput);

  await textapi.sentiment({
    text: textInput,
    mode: "document"
  }, function(error, responseSDK) {
    if (error === null) {
      console.log(responseSDK);
      response.json(responseSDK.polarity);
    }else {
      console.log(error)
      response.json("It looks like there is an error with the SDK")
    }    
    console.log("responseSDK")
  });
});