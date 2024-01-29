// Zohrehs Account (theApp) :: zohrehasadi2018@yahoo.com :: Z123456Z_?12dd

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const dateYesterday = new Date(yesterday.toLocaleString('en-US', { timeZone: 'Europe/Berlin' })).toISOString().split('T')[0];
console.log(dateYesterday);
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
.then(json => console.log(json));
/*
.then(json => {
  const { activitiesHeart } = json;
  if (activitiesHeart && activitiesHeart.length > 0) {
      const { startTime, endTime, restingHeartRate, value } = activitiesHeart[0].value.heartRateZones[1];
      
      console.log("startTime:", startTime);
      console.log("endTime:", endTime);
      console.log("restingHeartRate:", restingHeartRate);

      // Extracting heart rates between startTime and endTime
      const heartRates = value.slice(value.findIndex(entry => entry.dateTime === startTime), value.findIndex(entry => entry.dateTime === endTime) + 1);
      
      // Calculating average heart rate
      const avgHeartRate = heartRates.reduce((sum, entry) => sum + entry.value, 0) / heartRates.length;
      console.log("avgHeartRate:", avgHeartRate);
  } else {
      console.log("No heart rate data available for the specified date range.");
  }
})
.catch(error => console.error("Error fetching heart rate data:", error));
------

fetch(API_URL, { headers })
  .then(response => response.json())
  .then(data => {
    console.log('Heart Rate Data:', data);
    console.log('\n\n');
    console.log('Heart Rate Data:', data['activities-heart'][0].value);
  })
  .catch(error => {
    console.error('Error fetching heart rate data:', error);
  });
*/