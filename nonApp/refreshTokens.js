// Zohrehs Account (theApp) :: zohrehasadi2018@yahoo.com :: Z123456Z_?12dd

const refreshAPICall = 'https://api.fitbit.com/oauth2/token';
const refreshToken = '767b3eb77af213bc3bbf1307952f8f545cec2681a465434611cbeeb0b15ef0a3';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JORkciLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcwODUxMzk1MSwiaWF0IjoxNzA1OTIxOTUxfQ.tvoF8HKxH309iQCeKsl52b-AzwPS3Bte2dPjgz40AnI';

fetch(refreshAPICall, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('23RNFG:ab097963e66135ef37cca89c9d13fb5f'),
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}&expires_in=2592000`,
})
.then(response => response.json())
.then(json => console.log(json));
