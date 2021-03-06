var path = require('path')
const express = require('express')
//const mockAPIResponse = require('./mockAPI.js')
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
    res.sendFile(path.resolve('src/client/views/index.html'))
})

var textapi = new AYLIENTextAPI({
  application_id: process.env.APP_ID,
  application_key: process.env.APP_KEY
});

function sentimentResponse(request,response,next){
  const textInput = request.body.url
  textapi.sentiment({
    "url": textInput,
    "mode": "document"
  }, (error, responseSentiment) => {
      if (!error) {
        console.log("inside sentiment")
        console.log(responseSentiment);
        dataholder.polarity = responseSentiment.polarity;
        dataholder.text = responseSentiment.text;
        return next();
      }else {
        console.log(error);
      }   
    });
};
async function classifyResponse(request,response){
  const textInput = request.body.url
  textapi.classify({
    "url": textInput,
    "mode": "document"
  }, (error, responseClassify) =>{
    if (!error) {
      console.log("inside classify")
      console.log(responseClassify);
      if(responseClassify.categories.length >0){
      dataholder.category =  responseClassify.categories[0].label;
      }else{
        dataholder.category =  "Not descriminate";
      }
      response.send(dataholder);
    }else {
      console.log(error);
      response.send("error", error)
    }
  });
}

const dataholder = {};

app.post("/add", sentimentResponse, classifyResponse);

app.get("/all", (request,response) =>{
  console.log(dataholder);
  response.send(dataholder);
})



module.exports = app


