const http = require('http');
const app = require('./app');
const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;



const server = http.createServer(app,(req, res) => {
    // Create TwiML response
    const twiml = new twilio.TwimlResponse();
    twiml.say('Hello from your pals at Twilio! Have fun.');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });
server.listen(PORT);

