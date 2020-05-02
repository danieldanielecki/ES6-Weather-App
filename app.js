// Adding ".js" shouldn't matter for browser, it's just required for SystemJS to work properly.
import * as ELEMENTS from './elements.js';
import {
  Http
} from './http.js';
import {
  WEATHER_PROXY_HANDLER,
  WeatherData
} from './weather-data.js';

const API_ID = "c130602aab411b12657c06088dc4bfaf"; // This is a free plan anyways.

const searchWeather = () => {
  const CITY_NAME = ELEMENTS.ELEMENT_SEARCHED_CITY.value.trim(); // "trim()" remove empty whitespaces.

  if (CITY_NAME.length === 0) {
    return alert('Please enter a city name');
  }
  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';

  const URL = "http://api.openweathermap.org/data/2.5/weather?q= " + CITY_NAME + "&units=metric&appid=" + API_ID;

  Http.fetchData(URL)
    .then(responseData => {
      const WEATHER_DATA = new WeatherData(CITY_NAME, responseData.weather[0].description.toUpperCase()); // "responseData.weather.description" from OpenWeatherMap API (https://openweathermap.org/current#current_JSON).
      const WEATHER_PROXY = new Proxy(WEATHER_DATA, WEATHER_PROXY_HANDLER);
      WEATHER_PROXY.temperate = responseData.main.temp; // "&units=metric" makes that the response will be in Celsius instead of default's Kelvin temperature unit. Proxy makes sure that the temperature will be converted from Celsius to Fahrenheit.

      updateWeather(WEATHER_PROXY)
    })
    .catch(error => alert(error));
}

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', searchWeather);

function updateWeather(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperate;

  ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}