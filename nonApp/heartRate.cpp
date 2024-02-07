#include <iostream>
#include <string>
#include <chrono>
#include <ctime>
#include <iomanip>
#include <sstream>
#include <vector>
#include <algorithm>
#include <curl/curl.h>
#include <numeric>

// average = average heartRate.
// esp32 wroom da module

using namespace std;

const string heartRateDataToday = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min/time/09:00/22:00.json";

const string ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JORkciLCJzdWIiOiI3TVdWNjkiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyaHIgcnNsZSIsImV4cCI6MTcwOTg5MTk1OSwiaWF0IjoxNzA3Mjk5OTU5fQ.qbXxYufXSerwRdSoW14UwEFu3qZXLQjz8BvH4O_Kk40";

string heartRateData;

size_t WriteCallback(void *contents, size_t size, size_t nmemb, string *buffer)
{
    buffer->append((char *)contents, size * nmemb);
    return size * nmemb;
}

std::string findValues(const std::string &json)
{
    std::string result;
    size_t pos = json.find("\"value\":");
    while (pos != std::string::npos)
    {
        size_t start = json.find_first_of("0123456789.-", pos + 8);
        size_t end = json.find_first_not_of("0123456789.-", start);
        if (start != std::string::npos && end != std::string::npos)
        {
            result += json.substr(start, end - start) + ", ";
        }
        pos = json.find("\"value\":", end);
    }
    return result;
}

// Function to fetch data from API
void fetchData()
{
    CURL *curl;
    CURLcode res;
    string readBuffer;

    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if (curl)
    {
        // Set URL
        curl_easy_setopt(curl, CURLOPT_URL, heartRateDataToday.c_str());

        // Set headers
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, ("Authorization: Bearer " + ACCESS_TOKEN).c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // Set write function and buffer
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        // Perform the request
        res = curl_easy_perform(curl);

        // Check for errors
        if (res != CURLE_OK)
        {
            cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << endl;
        }

        heartRateData = readBuffer;

        // Clean up
        curl_easy_cleanup(curl);
        curl_global_cleanup();
    }

    // cout << "Response: " << readBuffer << endl; // print raw json data from API
}

void parseData()
{
    // std::string json = R "({" activities - heart ":[{" customHeartRateZones ":[]," dateTime ":" today "," heartRateZones ":[{" caloriesOut ":237.30656," max ":116," min ":30," minutes ":150," name ":" Out of Range "},{" caloriesOut ":0," max ":142," min ":116," minutes ":0," name ":" Fat Burn "},{" caloriesOut ":0," max ":174," min ":142," minutes ":0," name ":" Cardio "},{" caloriesOut ":0," max ":220," min ":174," minutes ":0," name ":" Peak "}]," value ":" 79.94 "}]," activities - heart - intraday ":{" dataset ":[{" time ":" 09 : 00 : 00 "," value ":73},{" time ":" 09 : 01 : 00 "," value ":71},{" time ":" 09 : 02 : 00 "," value ":70},{" time ":" 09 : 03 : 00 "," value ":70},{" time ":" 09 : 04 : 00 "," value ":70},{" time ":" 09 : 05 : 00 "," value ":68},{" time ":" 09 : 06 : 00 "," value ":71},{" time ":" 09 : 07 : 00 "," value ":70},{" time ":" 09 : 08 : 00 "," value ":70},{" time ":" 09 : 09 : 00 "," value ":68},{" time ":" 09 : 10 : 00 "," value ":73},{" time ":" 09 : 11 : 00 "," value ":71},{" time ":" 09 : 12 : 00 "," value ":71},{" time ":" 09 : 13 : 00 "," value ":73},{" time ":" 09 : 14 : 00 "," value ":69},{" time ":" 09 : 15 : 00 "," value ":64},{" time ":" 09 : 16 : 00 "," value ":67},{" time ":" 09 : 17 : 00 "," value ":67},{" time ":" 09 : 18 : 00 "," value ":65},{" time ":" 09 : 19 : 00 "," value ":73},{" time ":" 09 : 20 : 00 "," value ":87},{" time ":" 09 : 21 : 00 "," value ":95},{" time ":" 09 : 22 : 00 "," value ":101},{" time ":" 09 : 23 : 00 "," value ":97},{" time ":" 09 : 24 : 00 ",)";
    std::string values = findValues(heartRateData);
    if (!values.empty())
    {
        values.erase(values.size() - 2); // Remove the trailing comma and space
        // std::cout << "Values found: " << values << std::endl; // print values
    }
    else
    {
        std::cout << "No values found." << std::endl;
    }
    std::istringstream iss(values);
    std::vector<double> heartRates;
    double value;
    while (iss >> value)
    {
        heartRates.push_back(value);
    }

    double sum = std::accumulate(heartRates.begin(), heartRates.end(), 0.0);
    double average = sum / heartRates.size();
    std::cout << "Average heart rate: " << average << std::endl;
}

int main()
{
    fetchData();
    parseData();
    return 0;
}