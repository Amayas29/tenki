fetch("./config.json")
  .then((res) => res.json())
  .then((data) => (API_KEY = data["API_KEY"]));

const api = `https://api.openweathermap.org/data/2.5/weather?q=`;

const WEATHER_ICONS = {
  "01d": "assets/icons/sunny.png",
  "01n": "assets/icons/night.png",
  "02d": "assets/icons/day.png",
  "02n": "assets/icons/cloudy-night.png",
  "03d": "assets/icons/cloudy.png",
  "03n": "assets/icons/cloudy.png",
  "04d": "assets/icons/perfect-day.png",
  "04n": "assets/icons/cloudy-night.png",
  "09d": "assets/icons/rain.png",
  "09n": "assets/icons/rain-night.png",
  "10d": "assets/icons/rain.png",
  "10n": "assets/icons/rain-night.png",
  "11d": "assets/icons/storm.png",
  "11n": "assets/icons/storm.png",
};

const searchComponent = `        
<div class="logoContainer">
  <img src="assets/icons/logo.png" id="logo" />
</div>
<p id="searchLabel">Find weather of your city</p>
<form action="" class="searchContainer">
  <input type="search" placeholder="Your city" id="searchInput" autocomplete="off" />
  <button id="searchBtn">Search</button>
</form>
`;

const cityComponent = `        
<div class="temperatureContainer">
  <div class="temperatureDisplay">
    <p id="temperature"></p>
    <span> | </span>
    <span id="weatherText"></span>
  </div>
  <img id="weatherIcon" src="" alt="icon" />
</div>

<h3 id="city"></h3>
<p id="weatherInfo">Weather info</p>
<div class="weatherInfoContainer">
  <div class="infoContainer">
    <div class="weatherInfoIcon">
      <img src="assets/icons/temp.png" />
    </div>
    <div>
      <p id="sunrs"></p>
      <p id="sunDisplay"></p>
    </div>
  </div>
  <div class="infoContainer">
    <div class="weatherInfoIcon">
      <img src="assets/icons/humidity.png" />
    </div>
    <div>
      <p id="humidity"></p>
      <p>Humidity</p>
    </div>
  </div>
  <div class="infoContainer">
    <div class="weatherInfoIcon">
      <img src="assets/icons/wind.png" />
    </div>
    <div>
      <p id="wind"></p>
      <p>Wind</p>
    </div>
  </div>
  <div class="infoContainer">
    <div class="weatherInfoIcon">
      <img src="assets/icons/pressure.png" />
    </div>
    <div>
      <p id="pressure"></p>
      <p>Pressure</p>
    </div>
  </div>
</div>
`;

const weatherContainer = document.querySelector(".weather");

const fetchWeather = (city) => {
  fetch(`${api}${city}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.cod !== 200) {
        searchInput.value = "";
        return null;
      }

      weatherContainer.innerHTML = cityComponent;

      const isDay = data.weather[0].icon.includes("d");

      const temperature = document.getElementById("temperature");
      temperature.textContent = `${Math.floor(data.main.temp - 273.15)}°C`;

      const weatherText = document.getElementById("weatherText");
      weatherText.textContent = data.weather[0].description;

      const weatherIcon = document.getElementById("weatherIcon");
      weatherIcon.src = WEATHER_ICONS[data.weather[0].icon];

      const city = document.getElementById("city");
      city.textContent = `${data.name}, ${data.sys.country}`;

      const sunrs = document.getElementById("sunrs");
      const sunDisplay = document.getElementById("sunDisplay");

      const sunValue = isDay ? "sunset" : "sunrise";

      const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
          timeStamp * 1000
        ).getMinutes()}`;
      };

      sunrs.textContent = getTime(data.sys[sunValue]);
      sunDisplay.textContent = `S${sunValue.slice(1)}`;

      const humidity = document.getElementById("humidity");
      humidity.textContent = data.main.humidity;

      const wind = document.getElementById("wind");
      wind.textContent = data.wind.speed;

      const pressure = document.getElementById("pressure");
      pressure.textContent = data.main.pressure;
    })
    .catch((err) => console.error(err));
};

weatherContainer.innerHTML = searchComponent;

const searchForm = document.querySelector(".searchContainer");
const searchInput = document.querySelector("#searchInput");

if (searchForm)
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchWeather(searchInput.value);
  });
