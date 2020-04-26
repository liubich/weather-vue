export const getReadableErrorDesc = (error) => {
  const errorCodeToDescription = {
    [error.PERMISSION_DENIED]: 'Будь ласка, надайте сторінці доступ до місцезнаходження',
    [error.POSITION_UNAVAILABLE]: 'Недоступні дані про поточне місцезнаходження',
    [error.TIMEOUT]: 'Вийшов час для визначення місцезнаходження',
  };
  return errorCodeToDescription[error.code] || 'Невідома помилка';
};

export const saveCurrentPositionToLocalStorage = (currentPosition) => {
  if (!localStorage) return;
  localStorage.setItem('lastKnownPosition', JSON.stringify(currentPosition));
};

export const saveCurrentWeatherToLocalStorage = (currentWeather) => {
  if (!localStorage) return;
  localStorage.setItem('currentWeather', JSON.stringify(currentWeather));
};

export const savePreferredThemeToLocalStorage = (preferredTheme) => {
  if (!localStorage) return;
  localStorage.setItem('preferredTheme', preferredTheme);
};
