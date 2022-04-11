// API Key
const openWeatherAPIKey = "94f49d8b47b3e38bb49ca3e513df1828";
var currentCity = document.querySelector("#current-city");
var currentTemperature = document.querySelector("#temperature");
var currentTimezone = document.querySelector("#timezone");
var currentUVIndex = document.querySelector("#uvIndex");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");
var weatherIcon = document.querySelector("#weatherIcon");
var savedSearches = document.querySelector("#savedSearches");
var searchButton = document.querySelector("#searchButton");
var searchForm = document.querySelector("#searchForm");
// var inputCityName = document.querySelector("#inputCityName");

var citySearches = [];

// Display a live clock that includes the date.
window.setInterval(function () {
  $("#todaysDate").html(moment().format("dddd MM/DD/YYYY"));
}, 1000);

// Get the UV Index
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
      uvIndex = data.current.uvi;
      currentUVIndex.removeAttribute("class");
      if (uvIndex < 3) {
        currentUVIndex.classList.add("uvIndexLow");
        currentUVIndex.textContent = "UV Index: " + uvIndex + " : Favorable";
      }
      if (uvIndex >= 3 && uvIndex < 7) {
        currentUVIndex.classList.add("uvIndexMid");
        currentUVIndex.textContent = "UV Index: " + uvIndex + " : Moderate";
      }
      if (uvIndex >= 7) {
        currentUVIndex.classList.add("uvIndexHigh");
        currentUVIndex.textContent = "UV Index: " + uvIndex + " : Severe";
      }
      console.log(uvIndex);
      return uvIndex;
    });
}

// Get the current weather for the requested city
function getCityWeather(cityName) {
  var inputCityName = document.querySelector("#inputCityName").value;
  if (!citySearches.includes(inputCityName)) {
    citySearches.push(inputCityName);
    localStorage.setItem("Cities Searched", citySearches);
  }
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
      getFiveDayForeCast(useThisLat, useThisLon);
    });
}

// Get the five day forecast for the requested city
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
      fiveDay = data;
      // console.log(fiveDay)
      // console.log(fiveDay.list[3].dt_txt)
      // console.log(fiveDay.list[11].dt_txt)
      // console.log(fiveDay.list[19].dt_txt)
      // console.log(fiveDay.list[27].dt_txt)
      // console.log(fiveDay.list[35].dt_txt)

      var date0 = fiveDay.list[3].dt_txt;
      document.getElementById("date-0").textContent = date0.substring(0, 10);
      document.getElementById("temperature-0").textContent =
        "Temperature: " + fiveDay.list[3].main.temp + " °F";
      document.getElementById("windSpeed-0").textContent =
        "Wind Speed: " + fiveDay.list[3].wind.speed + " mph";
      document.getElementById("humidity-0").textContent =
        "Humidity: " + fiveDay.list[3].main.humidity;
      document.getElementById("weather-icon-0").src =
        "https://openweathermap.org/img/w/" +
        fiveDay.list[3].weather[0].icon +
        ".png";

      var date1 = fiveDay.list[11].dt_txt;
      document.getElementById("date-1").textContent = date1.substring(0, 10);
      document.getElementById("temperature-1").textContent =
        "Temperature: " + fiveDay.list[11].main.temp + " °F";
      document.getElementById("windSpeed-1").textContent =
        "Wind Speed: " + fiveDay.list[11].wind.speed + " mph";
      document.getElementById("humidity-1").textContent =
        "Humidity: " + fiveDay.list[11].main.humidity;
      document.getElementById("weather-icon-1").src =
        "https://openweathermap.org/img/w/" +
        fiveDay.list[11].weather[0].icon +
        ".png";

      var date2 = fiveDay.list[19].dt_txt;
      document.getElementById("date-2").textContent = date2.substring(0, 10);
      document.getElementById("temperature-2").textContent =
        "Temperature: " + fiveDay.list[19].main.temp + " °F";
      document.getElementById("windSpeed-2").textContent =
        "Wind Speed: " + fiveDay.list[19].wind.speed + " mph";
      document.getElementById("humidity-2").textContent =
        "Humidity: " + fiveDay.list[19].main.humidity;
      document.getElementById("weather-icon-2").src =
        "https://openweathermap.org/img/w/" +
        fiveDay.list[19].weather[0].icon +
        ".png";

      var date3 = fiveDay.list[27].dt_txt;
      document.getElementById("date-3").textContent = date3.substring(0, 10);
      document.getElementById("temperature-3").textContent =
        "Temperature: " + fiveDay.list[27].main.temp + " °F";
      document.getElementById("windSpeed-3").textContent =
        "Wind Speed: " + fiveDay.list[27].wind.speed + " mph";
      document.getElementById("humidity-3").textContent =
        "Humidity: " + fiveDay.list[27].main.humidity;
      document.getElementById("weather-icon-3").src =
        "https://openweathermap.org/img/w/" +
        fiveDay.list[27].weather[0].icon +
        ".png";

      var date4 = fiveDay.list[35].dt_txt;
      document.getElementById("date-4").textContent = date4.substring(0, 10);
      document.getElementById("temperature-4").textContent =
        "Temperature: " + fiveDay.list[35].main.temp + " °F";
      document.getElementById("windSpeed-4").textContent =
        "Wind Speed: " + fiveDay.list[35].wind.speed + " mph";
      document.getElementById("humidity-4").textContent =
        "Humidity: " + fiveDay.list[35].main.humidity;
      document.getElementById("weather-icon-4").src =
        "https://openweathermap.org/img/w/" +
        fiveDay.list[35].weather[0].icon +
        ".png";
    });
}
formSubmit();

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
  addImageElement.setAttribute("src", "");
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

function formSubmit(evt) {
  // evt.preventDefault()
  var city = inputCityName.value;
  getCityWeather(city);
}

function addEventListeners() {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmit();
  });
}

addEventListeners();
