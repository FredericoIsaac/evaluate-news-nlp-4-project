var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
require("dotenv").config();
var AYLIENTextAPI = require('aylien_textapi');

const app = express()

const bodyParser = require("body-parser");
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

const cors= require("cors");
        app.use(cors());

app.use(express.static('dist'))

app.get('/', function (req, res) {
   // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(5500, function () {
  console.log('Example app listening on port 5500!')
})
/*
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/

var textapi = new AYLIENTextAPI({
  application_id: process.env.APP_ID,
  application_key: process.env.APP_KEY
});

function sentimentResponse(textInput){
  textapi.sentiment({
    "url": textInput,
    "mode": "document"
  }, (error, responseSentiment) => {
      if (error === null) {
        console.log("inside sentiment")
        console.log(responseSentiment);
        dataholder.sentiment = responseSentiment.polarity;
        dataholder.text = responseSentiment.text;
      }else {
        console.log(error);
      }   
    });
};
async function classifyResponse(textInput){
  textapi.classify({
    "url": textInput,
    "mode": "document"
  }, (error, responseClassify) =>{
    if (error === null) {
      console.log("inside classify")
      console.log(responseClassify);
      if(responseClassify.categories.length >0){
      dataholder.category =  responseClassify.categories[0].label;
      }else{
        dataholder.category =  "Not descriminate";
      }
    }else {
      console.log(error);
    }
  });
}

const dataholder = {};

app.post("/add", async (request,response) =>{
  console.log(request.body);
  const textInput = request.body.url
   
    console.log("next sentiment")
       sentimentResponse(textInput)
    console.log("end sentiment")

    console.log("next classify")
    classifyResponse(textInput)
    console.log("end classify")
  
    console.log(dataholder, "nice try");
});

app.get("/all", (request,response) =>{
  console.log(dataholder);
  console.log("inside  get..............................................................")
  response.send(dataholder);
})

module.exports = app


