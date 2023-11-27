const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const fs = require('fs');
const e = require('express');

const colorblindPrefix = "/colorblind_image_tester"

app.use(colorblindPrefix + '/public', express.static(process.cwd() + '/public'));


// app.use(bodyParser.urlencoded({limit: '5mb', extended: false}));

app.get(colorblindPrefix + "/", function (req, res) {
  res.sendFile(process.cwd() + "/index.html");
});


app.get(colorblindPrefix + "/about", function (req, res) {
  res.sendFile(process.cwd() + "/about.html");
});


app.get(colorblindPrefix + "/cite", function (req, res) {
  res.sendFile(process.cwd() + "/cite.html");
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server is running!");
});
