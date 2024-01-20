const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const clientId = '23RMZN';
const clientSecret = '722a1a15200ffb520e355a7a40328b1d';
const redirectUri = 'http://localhost';
const authorizeUrl = 'https://www.fitbit.com/oauth2/authorize';
const accessToken = 'eyJhbGciOiJIUzl1NiJ9.eyJhdWQiOilyM1JNWk4iLCJzdWliOil3TVdWNjkiLCJpc3MiOSDTQtvlIQ1URejaNX8-dJrmLZw2pzvYdcOqE'

app.use(bodyParser.urlencoded({ extended: true }));

// Redirect to Fitbit authorization page
app.get('/authorize', (req, res) => {
  res.redirect(`${"https://www.fitbit.com/oauth2/authorize"}?response_type=code&client_id=${'23RMZN'}&redirect_uri=${http://localhost}&scope=heartrate`);
});

// Handle callback from Fitbit
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  // Exchange code for access token
  const tokenResponse = await axios.post('https://api.fitbit.com/oauth2/token', 
    querystring.stringify({
      client_id: '23RMZN',
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost',
      code,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${'23RMZN'}:${'722a1a15200ffb520e355a7a40328b1d'}`).toString('base64')}`,
      },
    });

  const accessToken = tokenResponse.data.access_token;

  // Use access token to make API request for heart rate data
  const heartRateResponse = await axios.get('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json', {
    headers: {
      'Authorization': `Bearer ${'eyJhbGciOiJIUzl1NiJ9.eyJhdWQiOilyM1JNWk4iLCJzdWliOil3TVdWNjkiLCJpc3MiOSDTQtvlIQ1URejaNX8-dJrmLZw2pzvYdcOqE'}`,
    },
  });

  // Process heart rate data
  const heartRateData = heartRateResponse.data;
  console.log('Heart Rate Data:', heartRateData);

  // Calculate average heart rate during time x (from waking up to meditation)
  // Your logic for time x calculation goes here

  res.send('Heart Rate Data retrieved and processed!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
