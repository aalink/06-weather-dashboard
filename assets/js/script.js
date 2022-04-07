// API Key
const openWeatherAPIKey = "94f49d8b47b3e38bb49ca3e513df1828";
var currentCity = document.querySelector("#current-city");
var currentTemperature = document.querySelector("#temperature");
var currentTimezone = document.querySelector("#timezone");
var currentUVIndex = document.querySelector("#uvIndex");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");
var cityData = "";

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
      cityData = data;
      currentCity.textContent = cityName.toUpperCase();
      currentTemperature.textContent = "Temperature: " + cityData.main.temp;
      currentTimezone.textContent = "Time: " + cityData.timezone;
      // currentUVIndex.textContent = "UV Index: " +
      currentHumidity.textContent = "Humidity: " + cityData.main.humidity;
      currentWindSpeed.textContent = "Wind Speed: " + cityData.wind.speed;
    });
}

var alpharetta = getCityWeather("cupertino");
