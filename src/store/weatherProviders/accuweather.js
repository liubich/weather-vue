import * as utils from '../utils';

export const getCurrentPositionFromAPI = async state => {
  const getCurrentPositionAPIUrl = ({ latitude, longitude, APIkey }) =>
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIkey}&q=${latitude},${longitude}&language=uk-ua`;

  const currentPositionAPIUrl = getCurrentPositionAPIUrl({
    latitude: state.currentPosition.latitude,
    longitude: state.currentPosition.longitude,
    APIkey: process.env.VUE_APP_ACCUWEATHER_KEY,
  });
  const positionJson = await utils.getAPIData(currentPositionAPIUrl);
  if (positionJson.error) return positionJson;
  if (positionJson.Key) {
    return {
      Key: positionJson.Key,
      City: positionJson.LocalizedName,
      dataLoadedFromAPI: true,
    };
  }
  return {
    error: true,
    errorDescription: 'Помилка при отриманні поточної погоди',
  };
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

const translateJSONToCurrentWeather = jsonResponse => {
  const iconNumber = getActualIconNumber(jsonResponse.WeatherIcon);
  return {
    icon: `img/weather-icons/${iconNumber || 'na'}.png`,
    temperature: parseInt(jsonResponse.Temperature.Metric.Value, 10),
    description: jsonResponse.WeatherText || 'Недоступно',
    dateTimeStamp: jsonResponse.EpochTime * 1000,
    windSpeed: utils.convertWindSpeedFromKmPerHToMPerS(jsonResponse.Wind.Speed.Metric.Value),
    windDirection: jsonResponse.Wind.Direction.Localized,
    windDirectionDeg: jsonResponse.Wind.Direction.Degrees,
    windBackgroundColor: utils.getWindBackgroundColor(
      utils.convertWindSpeedFromKmPerHToMPerS(jsonResponse.Wind.Speed.Metric.Value),
    ),
    pressure: utils.convertPressureFromhPaTommHg(parseInt(jsonResponse.Pressure.Metric.Value, 10)),
    pressureTendency: translatePressureTendency(jsonResponse.PressureTendency.Code),
    realFeelTemperature: jsonResponse.RealFeelTemperature.Metric.Value,
    realFeelTemperatureShade: jsonResponse.RealFeelTemperatureShade.Metric.Value,
    detailsURL: jsonResponse.MobileLink,
    precipitationType: translatePrecipitationType(jsonResponse.PrecipitationType),
    isDayTime: jsonResponse.IsDayTime,
  };
};

const getCurrentWeatherAPIUrl = ({ positionKey, APIkey }) =>
  `https://dataservice.accuweather.com/currentconditions/v1/${positionKey}?apikey=${APIkey}&language=uk-ua&details=true`;

export const getCurrentConditionsFromAPI = async state => {
  const currentWeatherUrl = getCurrentWeatherAPIUrl({
    positionKey: state.currentPosition.positionKey,
    APIkey: process.env.VUE_APP_ACCUWEATHER_KEY,
  });

  const currentWeatherJson = await utils.getAPIData(currentWeatherUrl);
  if (currentWeatherJson.error) return currentWeatherJson;
  const currentWeatherForStore = translateJSONToCurrentWeather(currentWeatherJson[0]);
  currentWeatherForStore.dataLoadedFromAPI = true;
  return currentWeatherForStore;
};
