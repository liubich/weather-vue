import { SAVE_ERROR_DESC } from './mutationTypes';

export const getAPIData = async (APIUrl, commit = null) => {
  return fetch(APIUrl).then(response => {
    if (response.ok) return response.json();
    if (commit) commit(SAVE_ERROR_DESC, response.statusText);
    throw new Error(`HTTP error, status = ${response.status}`);
  });
};

export const getReadableErrorDesc = error => {
  const errorCodeToDescription = {
    [error.PERMISSION_DENIED]: 'Будь ласка, надайте сторінці доступ до місцезнаходження',
    [error.POSITION_UNAVAILABLE]: 'Недоступні дані про поточне місцезнаходження',
    [error.TIMEOUT]: 'Вийшов час для визначення місцезнаходження',
  };
  return errorCodeToDescription[error.code] || 'Невідома помилка';
};

export const convertPressureFromhPaTommHg = pressureValuehPa =>
  Math.round(pressureValuehPa * 0.75006375541921);

export const convertWindSpeedFromKmPerHToMPerS = windSpeedKmPerH =>
  Math.round((windSpeedKmPerH / 3.6) * 10) / 10;

export const getWindBackgroundColor = windSpeedMPerS => {
  const windSpeedNumberForMapping = Math.ceil(windSpeedMPerS / 3);
  const windSpeedToBackgroundMapping = ['#FFF', '#DDD', '#BBB', '#999', '#000'];
  return windSpeedToBackgroundMapping[windSpeedNumberForMapping] || '#f36d6d';
};

export const saveCurrentPositionToLocalStorage = currentPosition => {
  if (!localStorage) return;
  localStorage.setItem('lastKnownPosition', JSON.stringify(currentPosition));
};

export const saveCurrentWeatherToLocalStorage = currentWeather => {
  if (!localStorage) return;
  localStorage.setItem('currentWeather', JSON.stringify(currentWeather));
};

export const getWindDirection = deg => {
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

export const formatTemperature = temperature => {
  return temperature > 0 ? `+ ${Math.round(temperature)}` : Math.round(temperature);
};
