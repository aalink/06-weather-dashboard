// API Key
const openWeatherAPIKey = "94f49d8b47b3e38bb49ca3e513df1828";
var currentCity = document.querySelector("#current-city");
var currentTemperature = document.querySelector("#temperature");
var currentTimezone = document.querySelector("#timezone");
var currentUVIndex = document.querySelector("#uvIndex");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");
var searchButton = document.querySelector("#searchButton");
var inputCityName = document.querySelector("#inputCityName").value;
var weatherIcon = document.querySelector("#weatherIcon");

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
      weatherIcon.src =
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      // currentTimezone.textContent = "Time: " + data.timezone;
      // currentUVIndex.textContent = "UV Index: " +
      currentHumidity.textContent = "Humidity: " + data.main.humidity;
      currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " mph";
      getUVIndex(useThisLat, useThisLon);
      getFiveDayForeCast(useThisLat, useThisLon);
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

function getFiveDayForeCast(lat, lon) {
  var fiveDayForecast =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat.toString() +
    "&lon=" +
    lon.toString() +
    "&appid=" +
    openWeatherAPIKey +
    "&units=imperial";
  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

searchButton.addEventListener("click", getCityWeather);

for (let i = 0; i < 5; i++) {
  var fiveDaySection = document.querySelector("#fiveDaySection");
  var createDay = document.createElement("div");
  createDay.setAttribute("id", "day" + i);
  createDay.classList.add("day-class");
  fiveDaySection.append(createDay);

  var selectDay = document.querySelector("#day" + i);
  var addImageElement = document.createElement("img");
  var addDateElement = document.createElement("p");
  var addTemperatureElement = document.createElement("p");
  var addWindSpeedElement = document.createElement("p");
  var addHumidityElement = document.createElement("p");

  // Create Date
  addDateElement.setAttribute("id", "date-" + i);
  selectDay.append(addDateElement);
  addDateElement.textContent = "Date: ";
  // Create icon representation
  addImageElement.setAttribute("id", "weather-icon-" + i);
  addImageElement.setAttribute("src", "/assets/images/winter-weather.jpg");
  selectDay.append(addImageElement);
  // Create temperature
  addTemperatureElement.setAttribute("id", "temperature-" + i);
  selectDay.append(addTemperatureElement);
  addTemperatureElement.textContent = "Temperature: ";
  // Create wind speed
  addWindSpeedElement.setAttribute("id", "windSpeed-" + i);
  selectDay.append(addWindSpeedElement);
  addWindSpeedElement.textContent = "Wind Speed: ";
  // Create humidity
  addHumidityElement.setAttribute("id", "humidity-" + i);
  selectDay.append(addHumidityElement);
  addHumidityElement.textContent = "Humidity: ";
}
