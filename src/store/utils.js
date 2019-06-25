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

export const getCurrentWeatherAPIUrl = ({ latitude, longitude, APIkey }) => `https://api.darksky.net/forecast/${APIkey}/${latitude},${longitude}?exclude=minutely,hourly,daily,alerts,flags&units=si&lang=uk`;

export const translateJSONToCurrentWeather = jsonResponse => ({
  icon: `img/weather_icons/${jsonResponse.icon || 'na'}.png`,
  temperature: Math.round(parseFloat(jsonResponse.temperature)),
  description: jsonResponse.summary || 'Unknown',
  dateTime: getFormattedDateStr(jsonResponse.time * 1000),
  windSpeed: Math.round(parseFloat(jsonResponse.windSpeed) * 10) / 10,
  windDirection: getWindDirection(parseInt(jsonResponse.windBearing, 10)),
  windDirectionDeg: parseInt(jsonResponse.windBearing, 10),
  pressure: parseFloat(jsonResponse.pressure),
});
