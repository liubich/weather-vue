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

const getWindDirection = (deg) => {
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

export const translateJSONToCurrentWeather = jsonResponse => ({
  icon: `https://cdn.aerisapi.com/wxblox/icons/${jsonResponse.ob.icon || 'na.png'}`,
  place: jsonResponse.place.name,
  countryCode: jsonResponse.place.country,
  temperature: Math.round(parseFloat(jsonResponse.ob.tempC)),
  description: jsonResponse.ob.weatherShort || 'Недоступно',
  dateTime: getFormattedDateStr(jsonResponse.ob.timestamp * 1000),
  windSpeed: Math.round((parseInt(jsonResponse.ob.windSpeedKPH, 10) / 3.6) * 10) / 10,
  windDirection: getWindDirection(parseInt(jsonResponse.ob.windDirDEG, 10)),
  windDirectionDeg: parseInt(jsonResponse.ob.windDirDEG, 10),
  pressure: parseInt(jsonResponse.ob.pressureMB, 10),
});

export const getCurrentWeatherAPIUrl = ({ positionKey, APIkey }) => `http://dataservice.accuweather.com/currentconditions/v1/${positionKey}?apikey=${APIkey}&language=uk-ua&details=true`;

export const getCurrentPositionAPIUrl = ({ latitude, longitude, APIkey }) => `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIkey}&q=${latitude},${longitude}&language=uk-ua&details=true`;
