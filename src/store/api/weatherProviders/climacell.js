import { isToday, isTomorrow, startOfDay } from 'date-fns';
import getAPIData from '../apiutils';
import * as utils from './weatherutils';

const API_KEY = process.env.VUE_APP_CLIMACELL_API_KEY;
const BASE_URL = 'https://api.climacell.co/v3/weather/forecast/';

const getImageNumber = (weatherCode, isDayTime) => {
  const weatherCodeTranslatorDay = {
    freezing_rain_heavy: '26',
    freezing_rain: '26',
    freezing_rain_light: '26',
    freezing_drizzle: '26',
    ice_pellets_heavy: '25',
    ice_pellets: '25',
    ice_pellets_light: '25',
    snow_heavy: '22',
    snow: '22',
    snow_light: '22',
    flurries: '19',
    tstorm: '15',
    rain_heavy: '12',
    rain: '13',
    rain_light: '14',
    drizzle: '18',
    fog_light: '11',
    fog: '11',
    cloudy: '7',
    mostly_cloudy: '6',
    partly_cloudy: '4',
    mostly_clear: '2',
    clear: '1',
  };
  const weatherCodeTranslatorNight = {
    freezing_rain_heavy: '26',
    freezing_rain: '26',
    freezing_rain_light: '26',
    freezing_drizzle: '26',
    ice_pellets_heavy: '25',
    ice_pellets: '25',
    ice_pellets_light: '25',
    snow_heavy: '22',
    snow: '22',
    snow_light: '22',
    flurries: '19',
    tstorm: '15',
    rain_heavy: '12',
    rain: '40',
    rain_light: '39',
    drizzle: '18',
    fog_light: '11',
    fog: '11',
    cloudy: '7',
    mostly_cloudy: '38',
    partly_cloudy: '34',
    mostly_clear: '34',
    clear: '33',
  };
  return `img/weather-icons/${
    isDayTime
      ? weatherCodeTranslatorDay[weatherCode] || 'na'
      : weatherCodeTranslatorNight[weatherCode] || 'na'
  }.png`;
};

const translateAPIDataToHourlyForecast = (hourlyForecastDataFromAPI) => {
  return hourlyForecastDataFromAPI
    .filter((hourForecast) => {
      const localTimestamp = new Date(hourForecast.observation_time.value);
      return localTimestamp >= Date.now();
    })
    .map((hourForecast) => {
      const isDayTime =
        hourForecast.observation_time.value >= hourForecast.sunrise.value &&
        hourForecast.observation_time.value <= hourForecast.sunset.value;
      const localTimestamp = new Date(hourForecast.observation_time.value);
      return {
        temperature: utils.formatTemperature(hourForecast.temp.value),
        appearingTemperature:
          utils.formatTemperature(hourForecast.temp.value) !==
          utils.formatTemperature(hourForecast.feels_like.value)
            ? utils.formatTemperature(hourForecast.feels_like.value)
            : '',
        windDirectionDeg: hourForecast.wind_direction.value,
        pressure: Math.round(hourForecast.baro_pressure.value),
        windBackgroundColor: utils.getWindBackgroundColor(hourForecast.wind_speed.value),
        windDirection: utils.getWindDirection(hourForecast.wind_direction.value),
        windSpeed: Math.round(hourForecast.wind_speed.value),
        windGustSpeed: Math.round(hourForecast.wind_gust.value),
        icon: getImageNumber(hourForecast.weather_code.value, isDayTime),
        weatherDescription: hourForecast.weather_code.value,
        time: localTimestamp.toLocaleTimeString('uk-UA', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        beginNextDay: !localTimestamp.getHours(),
        isDayTime,
      };
    });
};

const getAllDatesForHeader = (hourlyForecastDataFromAPI) => {
  const hourlyWeatherDatesInDate = hourlyForecastDataFromAPI.map((hourForecast) =>
    startOfDay(new Date(hourForecast.observation_time.value)),
  );

  const getUniqueItems = (items) => [...new Set(items)];

  const formatTooltip = (date) => {
    return isToday(date) || isTomorrow(date)
      ? date.toLocaleDateString('uk-UA', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
        })
      : date.toLocaleDateString('uk-UA', {
          day: '2-digit',
          month: 'long',
        });
  };

  const getDisplayStringByDate = (date) => {
    if (isToday(date)) return 'Сьогодні';
    if (isTomorrow(date)) return 'Завтра';
    return date.toLocaleDateString('uk-UA', {
      weekday: 'long',
    });
  };

  const hourlyWeatherDatesInMilliseconds = hourlyWeatherDatesInDate.map((arrayItem) => {
    return arrayItem.valueOf();
  });
  return getUniqueItems(hourlyWeatherDatesInMilliseconds).map((dateItemInms) => {
    const dateItemAsDate = new Date(dateItemInms);
    return {
      displayString: getDisplayStringByDate(dateItemAsDate),
      tooltipString: formatTooltip(dateItemAsDate),
      columnsNumber: hourlyWeatherDatesInDate.filter(
        (date) => date.getDay() === dateItemAsDate.getDay(),
      ).length,
    };
  });
};

export default async function getHourlyForecastFromAPI({ latitude, longitude }) {
  const headers = {
    apikey: API_KEY,
    'Content-Type': 'application/JSON',
  };
  const hourlyForecastUrl = `${BASE_URL}hourly?lat=${latitude}&lon=${longitude}&unit_system=si&fields=temp%3AC,feels_like%3AC,wind_speed%3Am%2Fs,wind_gust%3Am%2Fs,baro_pressure%3AmmHg,wind_direction%3Adegrees,sunrise,sunset,weather_code&start_time=now`;
  const hourlyForecastDataFromAPI = await getAPIData(hourlyForecastUrl, headers);
  return {
    data: translateAPIDataToHourlyForecast(hourlyForecastDataFromAPI),
    datesWithColumnsNumber: getAllDatesForHeader(hourlyForecastDataFromAPI),
  };
}
