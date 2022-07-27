// Time

let currentTime = new Date();

function formateDate(date) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let currentDay = days[currentTime.getDay()];

  let currentHour = currentTime.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let currentdate = document.querySelector("#date");
  currentdate.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;
}

formateDate(currentTime);

// Weather

function showCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

// Location

function showCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let key = "ce5598bd6f236bf030f14f446b138be0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

function showSearchedCity(city) {
  let unit = "metric";
  let key = "ce5598bd6f236bf030f14f446b138be0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${key}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSearchedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showSearchedCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchedCity);

let currentPositionButton = document.querySelector("#current-position-button");
currentPositionButton.addEventListener("click", getCurrentPosition);
