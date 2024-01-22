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

app.get('/api',	async (req, res) => {
    const {ticker, start, end} = req.parsedParams()
	
    if (req.method === 'POST' && req.url === '/holders') {
        let body = '';
        try {
          req.on('data', async (chunk) => {
            body += chunk.toString();
            const formData = JSON.parse(body);
            const direction = formData.direction;
            const postData = {
              direction: direction,
            };
            const flaskResponse = await axios.post('http://127.0.0.1:5000/button-press', postData);
            console.log(`Button pressed: ${direction}`);
        // Forward the Flask server's response to the client
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(flaskResponse.data));
          })
        } catch (error) {
          // Handle errors
          console.error('Error:', error.message);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to forward request to Flask server' }));
        }

    
  })

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

