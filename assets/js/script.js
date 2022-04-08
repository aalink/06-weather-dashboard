// API Key
const openWeatherAPIKey = "94f49d8b47b3e38bb49ca3e513df1828";
var currentCity = document.querySelector("#current-city");
var currentTemperature = document.querySelector("#temperature");
var currentTimezone = document.querySelector("#timezone");
var currentUVIndex = document.querySelector("#uvIndex");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");

// Display a live clock that includes the date.
window.setInterval(function () {
  $("#todaysDate").html(moment().format("dddd MM/DD/YYYY"));
}, 1000);

function getCityWeather(cityName) {
  var weatherByCityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    openWeatherAPIKey +
    "&units=imperial";
  // console.log(weatherByCityURL);


  fetch(weatherByCityURL)
    .then(function (response) {
      return response.json();
    })
    // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    .then(function (data) {
      console.log(data);
      useThisLat += data.coord.lat;
      useThisLon += data.coord.lon;
      console.log("############## Lat: " + useThisLat + " Lon: " + useThisLon + " ##############")
      currentCity.textContent = cityName.toUpperCase();
      currentTemperature.textContent = "Temperature: " + data.main.temp;
      // currentTimezone.textContent = "Time: " + data.timezone;
      // currentUVIndex.textContent = "UV Index: " +
      currentHumidity.textContent = "Humidity: " + data.main.humidity;
      currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed;
      getUVIndex(useThisLat, useThisLon);

    });
}
getCityWeather("atlanta");
// var lat = cityData.coord.lat;
// var lon = cityData.coord.lon;
// console.log(cityData.coord.lat)
// console.log(lon)

function getUVIndex(lat, lon) {
  var getUV =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat.toString() +
    "&lon=" +
    lon.toString() +
    "&exclude=hourly,daily&appid=" +
    openWeatherAPIKey;
  fetch(getUV)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentUVIndex.textContent = "UV Index: " + data.current.uvi
    });
}
// getUVIndex(33.749, -84.388);

// console.log(useThisLat)
// console.log(useThisLon)