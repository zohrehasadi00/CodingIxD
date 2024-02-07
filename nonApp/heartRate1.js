const axios = require('axios');
const clientId = '23RMZN';
const clientSecret = '722a1a15200ffb520e355a7a40328b1d';
const redirectUri = 'http://localhost';
const authorizeUrl = 'https://www.fitbit.com/oauth2/authorize';
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JNWk4iLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByb3h5IHJudXQgcnBybyByc2xlIHJjZiByYWN0IHJsb2MgcnJlcyByd2VpIHJociBydGVtIiwiZXhwIjoxNzA1ODUxNTY2LCJpYXQiOjE3MDU4MjI3NjZ9.KNai6tG1dnMpi9B51wfJ8C_PS6VIPALc93fwSVx-S1M'
const apiUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1w.json';

const minReadingsThreshold = 10; // Adjust as needed

// Function to fetch heart rate data from Fitbit API : https://dev.fitbit.com/build/reference/device-api/heart-rate/
async function fetchHeartRateData() {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const heartRateData = response.data['activities-heart'];

    // Process heart rate data and calculate average for each day
    const heartRateDictionary = {};
    heartRateData.forEach(reading => {
      const date = new Date(reading.dateTime);
      const day = date.toISOString().split('T')[0];
      const heartRate = reading.value.restingHeartRate;
      if (heartRate !== undefined || !isNaN(heartRate)) {
        if (!heartRateDictionary[day]) {
          heartRateDictionary[day] = { sum: 0, count: 0 };
        }
        
       heartRateDictionary[day].sum += heartRate;
        heartRateDictionary[day].count += 1;
      }
    }) ;

    // Calculate average heart rate for each day
    const resultDictionary = {};
    for (const [day, values] of Object.entries(heartRateDictionary)) {
      if (values.count >= minReadingsThreshold) {
        const averageHeartRate = values.sum / values.count;
        resultDictionary[day] = averageHeartRate.toFixed(2);
      }else {
        resultDictionary[day] = 'no meditation';
      }
    }

    return resultDictionary;
  } catch (error) {
    console.error('Error fetching heart rate data:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Function to print the heart rate dictionary
function printHeartRateDictionary(heartRateDictionary) {
  console.log('Heart Rate Data:');
  console.log(heartRateDictionary); // Corrected from print to console.log
  for (const [day, value] of Object.entries(heartRateDictionary)) {
    console.log(`${day}: ${value}`);
  }
}

// Run the script
async function runScript() {
  try {
    const heartRateDictionary = await fetchHeartRateData();
    printHeartRateDictionary(heartRateDictionary);
  } catch (error) {
    console.error('Script failed:', error.message);
  }
}

runScript();


/*
//Modify the API URL to fetch heart rate data for the specified time range:

const lastMeditationTimestamp = ...; // Fetch from your database
const apiUrl = `https://api.fitbit.com/1/user/-/activities/heart/date/${lastMeditationTimestamp}/1d.json`;


//Adjust the processing logic:
// Process heart rate data and calculate average
const heartRateDictionary = { sum: 0, count: 0 };
heartRateData.forEach(reading => {
  const heartRate = reading.value.restingHeartRate;
  if (heartRate !== undefined || !isNaN(heartRate)) {
    heartRateDictionary.sum += heartRate;
    heartRateDictionary.count += 1;
  }
});

// Calculate average heart rate
let averageHeartRate = 'no meditation';
if (heartRateDictionary.count >= minReadingsThreshold) {
  averageHeartRate = (heartRateDictionary.sum / heartRateDictionary.count).toFixed(2);
}
return averageHeartRate;

*/
