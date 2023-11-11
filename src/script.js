// Day and time function
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let date1 = date.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}, ${date1} ${month}`;
}

// Replace temperature and city with input from search bar function
function displayWeatherCondition(response) {
  // Replace city with input
  document.querySelector("#city").innerHTML = response.data.name;
  // Replace temperature with input city temperature
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  // Replace weather conditions with live data
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#icon"
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" />`;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input").value;

  searchCity(searchInput);
}

function searchLocation(position) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

// Forecast days function
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// Forecast API
function getForecast(coordinates) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

// Weather forecast function and loop
function displayForecast(response) {
  let forecastHTML = `<div class="row"`;
  response.data.daily.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
      <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
      src="https://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="42"
      class="weather-forecast-icon"
      />
      <div class="weather-forecast-temperatures">
      <span class="weather-forecast-temperature-max"
      ><strong>${Math.round(forecastDay.temp.max)}°</strong>
      </span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temp.min
      )}°</span>
        </div>
        </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

// Convert celsius to fahrenheit function
function changeTempFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrTemp = (temperatureElement * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

// Convert fahrenheit to celsius function
function changeTempCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

// Call time function
let time = document.querySelector("#current-time");
let currentTime = new Date();
time.innerHTML = formatDate(currentTime);

// Call search city and weather function
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Call change to fahrenheit function
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTempFahrenheit);

// Call change to celsius function
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeTempCelsius);

searchCity("New York");
