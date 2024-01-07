const express = require('express')
const app = express()
const axios = require('axios');
var request = require('request');
// respond with "hello world" when a GET request is made to the homepage
const key = '84KEARAA9LPW7AWO'
const daily_US = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${key}'

request.get({
  url: daily_US,
  json: true,
  headers: {'User-Agent': 'request'}
}, (err, res, data) => {
  if (err) {
    console.log('Error:', err);
  } else if (res.statusCode !== 200) {
    console.log('Status:', res.statusCode);
  } else {
    // data is successfully parsed as a JSON object:
    console.log(data);
  }
});


  app.get('/api', (req, res) => {
    res.json({'say' : 'hello world',})
  })

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

