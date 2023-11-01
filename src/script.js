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
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
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

// Convert celsius to fahrenheit function
function changeTempFahrenheit(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = `66`;
}

// Convert fahrenheit to celsius function
function changeTempCelsius(event) {
  event.preventDefault();
  let link = document.querySelector("#temperature");
  link.innerHTML = `17`;
}

// Call time function
let time = document.querySelector("#current-time");
let currentTime = new Date();
time.innerHTML = formatDate(currentTime);

// Call search city and weather function
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Call change to fahrenheit function
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeTempFahrenheit);

// Call change to celsius function
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeTempCelsius);

searchCity("New York");
