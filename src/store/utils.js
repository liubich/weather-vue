export const getReadableErrorDesc = error => {
  const errorCodeToDescription = {
    [error.PERMISSION_DENIED]: 'Будь ласка, надайте сторінці доступ до місцезнаходження',
    [error.POSITION_UNAVAILABLE]: 'Недоступні дані про поточне місцезнаходження',
    [error.TIMEOUT]: 'Вийшов час для визначення місцезнаходження',
  };
  return errorCodeToDescription[error.code] || 'Невідома помилка';
};

const getActualIconNumber = iconNumber => {
  const iconMapping = {
    3: '2',
    8: '7',
    23: '21',
    29: '26',
    35: '34',
    37: '5',
  };
  return iconMapping[iconNumber] || iconNumber;
};

const translatePressureTendency = pressureTendencyCode => {
  const pressureTendencyMapping = {
    F: 'падає',
    S: 'стабільний',
    R: 'зростає',
  };
  return pressureTendencyMapping[pressureTendencyCode] || null;
};

// eslint-disable-next-line max-len
const convertPressureFromhPaTommHg = pressureValuehPa =>
  Math.round(pressureValuehPa * 0.75006375541921);
// eslint-disable-next-line max-len
const convertWindSpeedFromKmPerHToMPerS = windSpeedKmPerH =>
  Math.round((windSpeedKmPerH / 3.6) * 10) / 10;

const getWindBackgroundColor = windSpeedKmPerH => {
  const windSpeedMPerS = convertWindSpeedFromKmPerHToMPerS(windSpeedKmPerH);
  const windSpeedNumberForMapping = Math.ceil(windSpeedMPerS / 3);
  const windSpeedToBackgroundMapping = ['#FFF', '#DDD', '#BBB', '#999', '#000'];
  return windSpeedToBackgroundMapping[windSpeedNumberForMapping] || '#f36d6d';
};

const translatePrecipitationType = (precipitationTypeInEnglish, languageCode = 'uk') => {
  if (!precipitationTypeInEnglish) return precipitationTypeInEnglish;
  const precipitationTypesEnglish = ['Rain', 'Snow', 'Ice', 'Mixed'];
  const precipitationsTranslator = {
    uk: ['Дощ', 'Сніг', 'Град', 'Змішані'],
  };
  const precipitationCode = precipitationTypesEnglish.indexOf(precipitationTypeInEnglish);
  if (precipitationCode === -1) return precipitationTypeInEnglish;
  return precipitationsTranslator[languageCode][precipitationCode];
};

export const translateJSONToCurrentWeather = jsonResponse => {
  const iconNumber = getActualIconNumber(jsonResponse.WeatherIcon);
  return {
    icon: `img/weather-icons/${iconNumber || 'na'}.png`,
    temperature: parseInt(jsonResponse.Temperature.Metric.Value, 10),
    description: jsonResponse.WeatherText || 'Недоступно',
    dateTimeStamp: jsonResponse.EpochTime * 1000,
    windSpeed: convertWindSpeedFromKmPerHToMPerS(jsonResponse.Wind.Speed.Metric.Value),
    windDirection: jsonResponse.Wind.Direction.Localized,
    windDirectionDeg: jsonResponse.Wind.Direction.Degrees,
    windBackgroundColor: getWindBackgroundColor(jsonResponse.Wind.Speed.Metric.Value),
    pressure: convertPressureFromhPaTommHg(parseInt(jsonResponse.Pressure.Metric.Value, 10)),
    pressureTendency: translatePressureTendency(jsonResponse.PressureTendency.Code),
    realFeelTemperature: jsonResponse.RealFeelTemperature.Metric.Value,
    realFeelTemperatureShade: jsonResponse.RealFeelTemperatureShade.Metric.Value,
    detailsURL: jsonResponse.MobileLink,
    precipitationType: translatePrecipitationType(jsonResponse.PrecipitationType),
    isDayTime: jsonResponse.IsDayTime,
  };
};

export const getCurrentWeatherAPIUrl = ({ positionKey, APIkey }) =>
  `https://dataservice.accuweather.com/currentconditions/v1/${positionKey}?apikey=${APIkey}&language=uk-ua&details=true`;

export const getCurrentPositionAPIUrl = ({ latitude, longitude, APIkey }) =>
  `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIkey}&q=${latitude},${longitude}&language=uk-ua`;

export const saveCurrentPositionToLocalStorage = currentPosition => {
  if (!localStorage) return;
  localStorage.setItem('lastKnownPosition', JSON.stringify(currentPosition));
};

export const saveCurrentWeatherToLocalStorage = currentWeather => {
  if (!localStorage) return;
  localStorage.setItem('currentWeather', JSON.stringify(currentWeather));
};

const getHourlyForecastAPIUrl = ({ latitude, longitude, APIKey, language = 'uk' }) => {
  return `https://api.weatherbit.io/v2.0/forecast/hourly?key=${APIKey}&lang=${language}&lat=${latitude}&lon=${longitude}`;
};

export const getHourlyForecastForCoordinates = async ({ latitude, longitude }) => {
  const hourlyForecastAPIUrl = getHourlyForecastAPIUrl({
    latitude,
    longitude,
    APIKey: process.env.VUE_APP_WEATHERBIT_KEY,
  });
  const response = await fetch(hourlyForecastAPIUrl);
  if (!response.ok) {
    throw new Error(`HTTP error, status = ${response.status}`);
  }
  const hourlyForecastData = await response.json();
  return hourlyForecastData;
};

const getWindDirection = deg => {
  const rumb = Math.ceil((deg - 11.25) / 22.5);
  const windDirectionTranslator = {
    0: 'Пн',
    1: 'Пн-Пн-С',
    2: 'Пн-С',
    3: 'Пн-С-С',
    4: 'С',
    5: 'Пд-С-С',
    6: 'Пд-С',
    7: 'Пд-Пд-С',
    8: 'Пд',
    9: 'Пд-Пд-З',
    10: 'Пд-З',
    11: 'Пд-З-З',
    12: 'З',
    13: 'Пн-З-З',
    14: 'Пн-З',
    15: 'Пн-Пн-З',
    16: 'Пн',
  };

  return windDirectionTranslator[rumb];
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

export const translateJSONToHourlyForecast = jsonResponse => {
  const hourlyForecastData = {};
  hourlyForecastData.data = jsonResponse.data.map(hourForecast => {
    const iconNumber = mapWeatherbitIconCodeToStandard(hourForecast.weather.icon);
    const localTimestamp = new Date(hourForecast.timestamp_local);
    return {
      temperature: hourForecast.temp,
      appearingTemperature: hourForecast.app_temp,
      windDirectionDeg: hourForecast.wind_dir,
      pressure: convertPressureFromhPaTommHg(hourForecast.pres),
      windBackgroundColor: getWindBackgroundColor(hourForecast.wind_spd),
      windDirection: getWindDirection(hourForecast.wind_dir),
      icon: `img/weather-icons/${iconNumber || 'na'}.png`,
      time: localTimestamp.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  });
  return hourlyForecastData;
};
