const express = require('express')
const app = express()
const axios = require('axios');
var request = require('request');
// respond with "hello world" when a GET request is made to the homepage

app.use(express.json()); // Middleware to parse JSON requests

// Custom middleware to extract parameters from requests
const extractParams = (req, res, next) => {
  try {
    req.parsedParams = {};

    // Extract parameters from GET requests
    if (req.method === 'GET') {
      req.parsedParams = { ...req.parsedParams, ...req.query };
    }

    // Extract parameters from POST requests
    if (req.method === 'POST' && req.body) {
      req.parsedParams = { ...req.parsedParams, ...req.body };
    }

    next();
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: 'Bad Request' });
  }
};

app.use(extractParams)



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

