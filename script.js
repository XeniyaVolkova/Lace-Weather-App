function formatDate(timestamp) {
  let date= new Date(timestamp);
  let hours = date.getHours();
  
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[dayIndex];
  return `${days[dayIndex]}, ${hours}:${minutes}`;
}

function formatHours(timestamp){
  let date= new Date(timestamp);
  let hours = date.getHours();
  
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#descriptionFeel").innerHTML=Math.round(response.data.main.feels_like);
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    celsiusTemperature=response.data.main.temp;
    document.querySelector("#current-time").innerHTML=formatDate(response.data.dt*1000);
console.log(response.data);
let iconElement=document.querySelector("#icon");
iconElement.setAttribute("src", `visuals/icon_${response.data.weather[0].icon}.png`);
iconElement.setAttribute("alt",`${response.data.weather[0].description}`); 
let icon = document.querySelector("#girl-icon");
let currentWeather = response.data.weather[0].main.toLowerCase();if(currentWeather === "clear") {
  icon.setAttribute("src", `Summer.png`);
} else if(currentWeather === "rain") {
  icon.setAttribute("src", "Rain.png");
  } else if(currentWeather === "clouds") {
  icon.setAttribute("src", "Spring.png");
} else if(currentWeather === "snow") {
  icon.setAttribute("src", "Snow.png");
} else if(currentWeather === "mist") {
  icon.setAttribute("src", "Dressy.png");
  } else if(currentWeather === "drizzle") {
  icon.setAttribute("src", "Glam.png");
} else if(currentWeather === "thunderstorm") {
  icon.setAttribute("src", "Rain.png");
} else if(currentWeather === "haze") {
  icon.setAttribute("src", "Glam.png");
}
console.log(data.response)
  }
function searchLocation(position) {
  let apiKey = "9724f817a3ad04371bf18467e4cb2880";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=10&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
 
}
function displayForecast (response){
   
  let forecastElement=document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index=0; index <6; index++){
    let forecast=response.data.list[index];
forecastElement.innerHTML+=` 
  <div class="marker col">
  <p class="fiveDays">${formatHours(forecast.dt*1000)}</p>
  
  <p> <img 
            class="forecast-3hour-result-icon"
            id = "#"
            src="visuals/icon_${forecast.weather[0].icon}.png" width=50
            alt="">   </p> 
  <p class="max-min">max °|min °</p>
            <p class="fiveDaysTemperature"><strong>${Math.round(forecast.main.temp_max)}° |</strong> ${Math.round(forecast.main.temp_min)}°</p>
  </div>`
  }

  
console.log(response.data);
}
function search(city) {
  let apiKey = "9724f817a3ad04371bf18467e4cb2880";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
function getCurrentLocation(event) {
  
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let fahrenheitTemperature=Math.round((celsiusTemperature * 9)/5 + 32);
  document.querySelector("#temperature").innerHTML =fahrenheitTemperature;
  
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =Math.round(celsiusTemperature);
  
}

let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);
dateElement.innerHTML = formatDate(currentTime);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature=null;

let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");