export const convertPressureFromhPaTommHg = (pressureValuehPa) =>
  Math.round(pressureValuehPa * 0.75006375541921);

export const convertWindSpeedFromKmPerHToMPerS = (windSpeedKmPerH) =>
  Math.round((windSpeedKmPerH / 3.6) * 10) / 10;

export const getWindBackgroundColor = (windSpeedMPerS) => {
  const windSpeedNumberForMapping = Math.ceil(windSpeedMPerS / 3);
  const windSpeedToBackgroundMapping = ['#FFF', '#DDD', '#BBB', '#999', '#000'];
  return windSpeedToBackgroundMapping[windSpeedNumberForMapping] || '#f36d6d';
};

export const getWindDirection = (deg) => {
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

export const formatTemperature = (temperature) => {
  return temperature > 0 ? `+ ${Math.round(temperature)}` : Math.round(temperature);
};
