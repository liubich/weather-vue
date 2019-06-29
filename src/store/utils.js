export const getReadableErrorDesc = (error) => {
  const errorCodeToDescription = {
    [error.PERMISSION_DENIED]: 'Будь ласка, надайте сторінці доступ до місцезнаходження',
    [error.POSITION_UNAVAILABLE]: 'Недоступні дані про поточне місцезнаходження',
    [error.TIMEOUT]: 'Вийшов час для визначення місцезнаходження',
  };
  return errorCodeToDescription[error.code] || 'Невідома помилка';
};

const getFormattedDateStr = (UNIXdate) => {
  const reqDate = new Date(parseInt(UNIXdate, 10));
  return reqDate.toLocaleString('uk-UA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const translateJSONToCurrentWeather = jsonResponse => ({
  icon: `img/weather-icons/${jsonResponse.WeatherIcon || 'na.png'}`,
  temperature: parseInt(jsonResponse.Temperature.Metric.Value, 10),
  description: jsonResponse.WeatherText || 'Недоступно',
  dateTime: getFormattedDateStr(jsonResponse.EpochTime),
  windSpeed: Math.round((parseInt(jsonResponse.Wind.Speed.Metric.Value, 10) / 3.6) * 10) / 10,
  windDirection: jsonResponse.Wind.Direction.Localized,
  windDirectionDeg: jsonResponse.Wind.Direction.Degrees,
  pressure: parseInt(jsonResponse.Pressure.Metric.Value, 10),
});

export const getCurrentWeatherAPIUrl = ({ positionKey, APIkey }) => `https://dataservice.accuweather.com/currentconditions/v1/${positionKey}?apikey=${APIkey}&language=uk-ua&details=true`;

export const getCurrentPositionAPIUrl = ({ latitude, longitude, APIkey }) => `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIkey}&q=${latitude},${longitude}&language=uk-ua`;
