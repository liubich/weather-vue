import { isToday, isTomorrow, startOfDay } from 'date-fns';
import * as utils from './weatherutils';
import getAPIData from '../apiutils';

const getHourlyForecastAPIUrl = ({ latitude, longitude, APIKey, language = 'uk' }) => {
  return `https://api.weatherbit.io/v2.0/forecast/hourly?key=${APIKey}&lang=${language}&lat=${latitude}&lon=${longitude}`;
};

const getHourlyForecastForCoordinates = async ({ latitude, longitude }) => {
  const hourlyForecastAPIUrl = getHourlyForecastAPIUrl({
    latitude,
    longitude,
    APIKey: process.env.VUE_APP_WEATHERBIT_KEY,
  });
  const hourlyForecastData = await getAPIData(hourlyForecastAPIUrl).catch(e => {
    throw e;
  });
  return hourlyForecastData;
};

const mapWeatherbitIconCodeToStandard = weatherbitIconCode => {
  const iconsMapping = {
    t01d: '15',
    t02d: '15',
    t03d: '15',
    t04d: '15',
    t05d: '15',
    d01d: '18',
    d02d: '18',
    d03d: '18',
    r01d: '18',
    r02d: '18',
    r03d: '18',
    r04d: '18',
    r05d: '12',
    r06d: '12',
    f01d: '19',
    s01d: '22',
    s02d: '22',
    s03d: '22',
    s04d: '29',
    s05d: '25',
    s06d: '19',
    a01d: '11',
    a02d: '11',
    a03d: '5',
    a04d: '11',
    a05d: '11',
    a06d: '11',
    c01d: '1',
    c02d: '2',
    c03d: '4',
    c04d: '7',
    t01n: '15',
    t02n: '15',
    t03n: '15',
    t04n: '15',
    t05n: '15',
    d01n: '18',
    d02n: '18',
    d03n: '18',
    r01n: '18',
    r02n: '18',
    r03n: '18',
    r04n: '18',
    r05n: '12',
    r06n: '12',
    f01n: '19',
    s01n: '22',
    s02n: '22',
    s03n: '22',
    s04n: '29',
    s05n: '25',
    s06n: '19',
    a01n: '11',
    a02n: '11',
    a03n: '5',
    a04n: '11',
    a05n: '11',
    a06n: '11',
    c01n: '33',
    c02n: '34',
    c03n: '36',
    c04n: '7',
  };
  return iconsMapping[weatherbitIconCode] || weatherbitIconCode;
};

const translateJSONToHourlyForecast = hourlyForecastDataFromAPI => {
  return hourlyForecastDataFromAPI.map(hourForecast => {
    const iconNumber = mapWeatherbitIconCodeToStandard(hourForecast.weather.icon);
    const localTimestamp = new Date(hourForecast.timestamp_local);
    return {
      temperature: utils.formatTemperature(hourForecast.temp),
      appearingTemperature:
        Math.round(hourForecast.app_temp) !== Math.round(hourForecast.temp)
          ? utils.formatTemperature(hourForecast.app_temp)
          : '',
      windDirectionDeg: hourForecast.wind_dir,
      pressure: utils.convertPressureFromhPaTommHg(hourForecast.pres),
      windBackgroundColor: utils.getWindBackgroundColor(hourForecast.wind_spd),
      windDirection: utils.getWindDirection(hourForecast.wind_dir),
      windSpeed: Math.round(hourForecast.wind_spd),
      windGustSpeed: Math.round(hourForecast.wind_gust_spd),
      icon: `img/weather-icons/${iconNumber || 'na'}.png`,
      weatherDescription: hourForecast.weather.description,
      time: localTimestamp.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      beginNextDay: !localTimestamp.getHours(),
      isDayTime: hourForecast.pod === 'd',
    };
  });
};

const getAllDatesForHeader = hourlyForecastDataFromAPI => {
  const hourlyWeatherDatesInDate = hourlyForecastDataFromAPI.map(hourForecast =>
    startOfDay(new Date(hourForecast.timestamp_local)),
  );

  const getUniqueItems = items => [...new Set(items)];

  const formatTooltip = date => {
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

  const getDisplayStringByDate = date => {
    if (isToday(date)) return 'Сьогодні';
    if (isTomorrow(date)) return 'Завтра';
    return date.toLocaleDateString('uk-UA', {
      weekday: 'long',
    });
  };

  const hourlyWeatherDatesInMilliseconds = hourlyWeatherDatesInDate.map(arrayItem => {
    return arrayItem.valueOf();
  });
  return getUniqueItems(hourlyWeatherDatesInMilliseconds).map(dateItemInms => {
    const dateItemAsDate = new Date(dateItemInms);
    return {
      displayString: getDisplayStringByDate(dateItemAsDate),
      tooltipString: formatTooltip(dateItemAsDate),
      columnsNumber: hourlyWeatherDatesInDate.filter(
        date => date.getDay() === dateItemAsDate.getDay(),
      ).length,
    };
  });
};

export default async function getHourlyForecastFromAPI(state) {
  const hourlyForecastDataFromAPI = await getHourlyForecastForCoordinates({
    latitude: state.currentPosition.latitude,
    longitude: state.currentPosition.longitude,
  });
  if (hourlyForecastDataFromAPI.error) return hourlyForecastDataFromAPI;
  if (hourlyForecastDataFromAPI.data) {
    return {
      data: translateJSONToHourlyForecast(hourlyForecastDataFromAPI.data),
      datesWithColumnsNumber: getAllDatesForHeader(hourlyForecastDataFromAPI.data),
    };
  }
  return {
    error: true,
    errorDescription: 'Помилка отримання погодинного прогнозу',
  };
}
