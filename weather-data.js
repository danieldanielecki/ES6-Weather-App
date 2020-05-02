export class WeatherData {
  constructor(cityName, description) {
    this.cityName = cityName;
    this.description = description;
    this.temperature = '';
  }
}

// Handler for Proxy API.
export const WEATHER_PROXY_HANDLER = {
  // Trap for getting property values.
  get: function (target, property) {
    return Reflect.get(target, property); // Usage of Reflect API which aims to handle interceptable JavaScript operations, mainly used to provide reasonable way to forward actions called on Proxy traps.
  },
  // Trap for setting property values.
  set: function (target, property, value) {
    const newValue = (value * 1.8 + 32).toFixed(2) + 'F.'; // Convert Celsius to Fahrenheit.
    return Reflect.set(target, property, newValue); // Usage of Reflect API which aims to handle interceptable JavaScript operations, mainly used to provide reasonable way to forward actions called on Proxy traps.
  }
};