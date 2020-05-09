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

const dataholder = [];

console.log(textapi);

app.get("/sentiment/:text", (req,res) => {
   console.log(req.params);
   const textInput = req.params.text;
   console.log(textInput);

    textapi.sentiment({
      text: textInput,
      mode: "document"
    }, function(error, responseSentiment) {
        if (error === null) {
          console.log(responseSentiment);
          dataholder.push(responseSentiment.polarity);
        }else {
          console.log(error)
          res.json("It looks like there is an error with the SDK")
        }   
        console.log(dataholder);
      });

   textapi.classify({
      text: textInput,
      mode: "document"
    }, function (error, responseClassify){
      if (error === null) {
        console.log(responseClassify);
        dataholder.push(responseClassify.categories[0].label);
      }else {
        console.log(error)
        res.json("It looks like there is an error with the SDK")
      }
      console.log(dataholder);
    });
    
      console.log(dataholder);
      res.send(dataholder); 
});

