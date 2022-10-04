const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const app = express(),
            bodyParser = require("body-parser");
            port = 80;
const { postMessage } = require('./MongoConnection.js');

var client;

async function main(){
  const uri = "mongodb+srv://<DETAILS>@contact-messages.uicfwgn.mongodb.net/?retryWrites=true&w=majority";

  client = new MongoClient(uri);
}

async function storeMessage(message){
  try {
    await client.connect();
    await postMessage(client, message);
    console.log("Message stored.");
  } catch(e){
    console.error(e);
  } finally {
    await client.close();
  }
  // TODO: Find SMTP relay
}

main();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.htl'));
});

app.post('/api/message', (req, res) => {
  const message = req.body.message;
  console.log("Message received, storing...");

  storeMessage(message);

  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, () => {
  console.log("App is now listening on port " + port);
});
