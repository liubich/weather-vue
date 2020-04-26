import * as mutationTypes from './mutationTypes';
import * as utils from './utils';

export default function localStoragePlugin(store) {
  if (!localStorage) return;
  const lastKnownPositionFromLocalStorage = localStorage.getItem('lastKnownPosition');
  const currentWeatherFromLocalStorage = localStorage.getItem('currentWeather');
  const theme = localStorage.getItem('preferredTheme');
  if (
    lastKnownPositionFromLocalStorage &&
    currentWeatherFromLocalStorage &&
    !store.state.currentWeather.dataLoadedFromAPI
  ) {
    store.commit(
      mutationTypes.SAVE_CURRENT_POSITION_DATA,
      JSON.parse(lastKnownPositionFromLocalStorage),
    );
    store.commit(mutationTypes.SAVE_CURRENT_WEATHER, JSON.parse(currentWeatherFromLocalStorage));
    store.commit(mutationTypes.SAVE_PREFERRED_THEME, { theme, source: 'localstorage' });
  }
  store.subscribe((mutation) => {
    switch (mutation.type) {
      case mutationTypes.SAVE_CURRENT_POSITION_DATA:
        if (mutation.payload.dataLoadedFromAPI) {
          utils.saveCurrentPositionToLocalStorage({
            ...mutation.payload,
            dataLoadedFromAPI: null,
          });
        }
        break;
      case mutationTypes.SAVE_CURRENT_WEATHER:
        if (mutation.payload.dataLoadedFromAPI) {
          utils.saveCurrentWeatherToLocalStorage({ ...mutation.payload, dataLoadedFromAPI: null });
        }
        break;
      case mutationTypes.SAVE_PREFERRED_THEME:
        if (mutation.payload.source === 'toggle') {
          utils.savePreferredThemeToLocalStorage(mutation.payload.theme);
        }
        break;
      default:
    }
  });
}
