// API Key
const openWeatherAPIKey = "94f49d8b47b3e38bb49ca3e513df1828";
var currentCity = document.querySelector("#current-city");
var currentTemperature = document.querySelector("#temperature");
var currentTimezone = document.querySelector("#timezone");
var currentUVIndex = document.querySelector("#uvIndex");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");
var searchButton = document.querySelector("#searchButton");

// Display a live clock that includes the date.
window.setInterval(function () {
  $("#todaysDate").html(moment().format("dddd MM/DD/YYYY"));
}, 1000);

function getCityWeather(cityName) {
  var inputCityName = document.querySelector("#inputCityName").value;
  if (!inputCityName) {
    console.error("Nothing was entered. Please type the name of a city.");
    return;
  }
  cityName = inputCityName;
  var weatherByCityURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    openWeatherAPIKey +
    "&units=imperial";

  fetch(weatherByCityURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      useThisLat = data.coord.lat;
      useThisLon = data.coord.lon;
      currentCity.textContent = cityName.toUpperCase();
      currentTemperature.textContent = "Temperature: " + data.main.temp + " °F";
      // currentTimezone.textContent = "Time: " + data.timezone;
      // currentUVIndex.textContent = "UV Index: " +
      currentHumidity.textContent = "Humidity: " + data.main.humidity;
      currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      getUVIndex(useThisLat, useThisLon);
    });
}

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
      currentUVIndex.textContent = "UV Index: " + data.current.uvi;
    });
}
searchButton.addEventListener("click", getCityWeather);
