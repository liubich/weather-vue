import * as mutationTypes from './mutationTypes';
import * as utils from './utils';

export default function localStoragePlugin(store) {
  if (!localStorage) return;
  const lastKnownPositionFromLocalStorage = localStorage.getItem('lastKnownPosition');
  const currentWeatherFromLocalStorage = localStorage.getItem('currentWeather');
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
      default:
    }
  });
}
