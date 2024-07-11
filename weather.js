const apiKey = '6fb45d4563da1dde899728b0a806dccd&units';

let measurmentUnits = 'metric';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=${measurmentUnits}&appid=${apiKey}&q=`;

const weatherBlock = document.querySelector('.weather');
const city = document.querySelector('.weather__city-name');
const temperature = document.querySelector('.weather__temperature');

const weatherIcon = document.querySelector('.weather__icon');
const humidityPercent = document.querySelector('.weather__humidity-percent');
const windSpeed = document.querySelector('.weather__wind-speed');

const searchInput = document.querySelector('.card__input');
const searchBtn = document.querySelector('.card__search-btn');

const errorBlock = document.querySelector('.card__error');

const setWeatherIcon = (weather) => {
  if (weather != null) {
    return weatherIcon.src = `images/${weather.toLocaleLowerCase()}.png`;
  }
}


async function checkWeather(cityName) {
  try {
    const response = await fetch(`${apiUrl}${cityName}`);

    let data = await response.json();

    if (!data.name) {
      errorBlock.style.display = 'block';
      weatherBlock.style.display = 'none';
    }
    

    city.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidityPercent.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed)} km/h`;

    setWeatherIcon(data.weather[0].main);

    weatherBlock.style.display = 'flex';
    errorBlock.style.display = 'none';
  } catch (err) {
    console.error('Произошла ошибка!', err)
  }
}



searchBtn.addEventListener('click', () => {
  let city = searchInput.value;
  checkWeather(city);
  
  searchInput.value = '';
})