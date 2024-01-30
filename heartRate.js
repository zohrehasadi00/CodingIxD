// Zohrehs Account (theApp) :: zohrehasadi2018@yahoo.com :: Z123456Z_?12dd

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const dateYesterday = new Date(yesterday.toLocaleString('en-US', { timeZone: 'Europe/Berlin' })).toISOString().split('T')[0];
console.log("Yesterday's date:", dateYesterday);
//const avgheartRate = json['activities-heart'][0].value;
//console.log(avgheartRate);

// Heart Rate Data:
const heartRateDataToday = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json'
const heartRateDataInterval = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min/time/09:00/22:00.json'
const heartRateDataYesterday = `https://api.fitbit.com/1/user/-/activities/heart/date/${dateYesterday}/1d/1min.json`;
const heartRateDataDates = 'https://api.fitbit.com/1/user/-/activities/heart/date/2024-01-29/1d/1min/time/09:00/22:00.json'

// Sleep Data
const sleepDataToday = 'https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=today&sort=asc&offset=0&limit=1'
const sleepDataYesterday = `https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=${dateYesterday}&sort=asc&offset=0&limit=1`

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JORkciLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcwODUxMzk1MSwiaWF0IjoxNzA1OTIxOTUxfQ.tvoF8HKxH309iQCeKsl52b-AzwPS3Bte2dPjgz40AnI';

fetch(heartRateDataDates, {
    method: "GET",
    headers: {"Authorization": "Bearer " + ACCESS_TOKEN}
})
.then(response => response.json())
//.then(json => console.log(json));
.then(json => {
  const avgheartRate = json['activities-heart'][0].value;
  console.log("Average heart rate from yesterday:", avgheartRate);
  if (json['activities-heart-intraday']) {
    const intradayData = json['activities-heart-intraday'];
    
    // Access the first and last elements of the 'dataset' array
    const firstEntry = intradayData.dataset[0];
    const lastEntry = intradayData.dataset[intradayData.dataset.length - 1];
    
    // Convert time strings to Date objects
    const firstEntryTime = new Date(`2000-01-01T${firstEntry.time}`);
    const lastEntryTime = new Date(`2000-01-01T${lastEntry.time}`);    
    
    // Calculate the time difference
    const timeDifference = new Date(lastEntryTime - firstEntryTime);    
    
    // Format the time difference
    const formattedTimeDifference = `${timeDifference.getUTCHours()}:${timeDifference.getUTCMinutes()}:${timeDifference.getUTCSeconds()}`;    console.log("Time difference between 1st and last heart rate:", formattedTimeDifference);

  } else {
    console.log("No intraday heart rate data available.");
}
});