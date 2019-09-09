import * as mutationTypes from './mutationTypes';
import * as utils from './utils';

export default function localStoragePlugin({ state, commit, subscribe }) {
  if (localStorage) {
    const lastKnownPositionFromLocalStorage = localStorage.getItem('lastKnownPosition');
    const currentWeatherFromLocalStorage = localStorage.getItem('currentWeather');
    if (
      lastKnownPositionFromLocalStorage
      && currentWeatherFromLocalStorage
      && !state.currentWeather.dataLoadedFromAPI
    ) {
      commit(
        mutationTypes.SAVE_CURRENT_POSITION_DATA,
        JSON.parse(lastKnownPositionFromLocalStorage),
      );
      commit(mutationTypes.SAVE_WEATHER, JSON.parse(currentWeatherFromLocalStorage));
    }
  }
  subscribe((mutation) => {
    if (!localStorage) return;
    switch (mutation.type) {
      case mutationTypes.SAVE_CURRENT_POSITION_DATA:
        if (mutation.payload.latitude) {
          utils.saveCurrentPositionToLocalStorage({
            Key: mutation.payload.currentPosition.positionKey,
            City: mutation.payload.currentPosition.city,
          });
        }
        break;
      case mutationTypes.SAVE_WEATHER:
        if (mutation.payload.dataLoadedFromAPI) {
          utils.saveCurrentWeatherToLocalStorage({ ...mutation.payload, dataLoadedFromAPI: null });
        }
        break;
      default:
    }
  });
}
