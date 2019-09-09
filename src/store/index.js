import Vue from 'vue';
import Vuex from 'vuex';
import * as mutationTypes from './mutationTypes';
import * as utils from './utils';
import localStoragePlugin from './localStoragePlugin';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentPosition: {
      latitude: null,
      longitude: null,
      positionKey: null,
      city: null,
    },
    currentWeather: {
      icon: null,
      place: null,
      countryCode: null,
      temperature: null,
      description: null,
      dateTime: null,
      windSpeed: null,
      windDirection: null,
      windDirectionDeg: null,
      windDirectionBackground: 'black',
      pressure: null,
      pressureTendency: null,
      realFeelTemperature: null,
      realFeelTemperatureShade: null,
      detailsURL: null,
      precipitationType: null,
      dataLoadedFromAPI: false,
    },
    errorDesc: null,
  },
  mutations: {
    [mutationTypes.SAVE_COORDINATES](state, currentPosition) {
      state.currentPosition.latitude = currentPosition.latitude;
      state.currentPosition.longitude = currentPosition.longitude;
    },
    [mutationTypes.SAVE_WEATHER](state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    [mutationTypes.SAVE_ERROR_DESC](state, errorDesc) {
      state.errorDesc = errorDesc;
    },
    [mutationTypes.SAVE_CURRENT_POSITION_DATA](state, currentPosition) {
      state.currentPosition.positionKey = currentPosition.Key;
      state.currentPosition.city = currentPosition.City;
    },
  },
  getters: {
    isWeatherGot: state => !!state.currentWeather.description,
  },
  actions: {
    getCurrentPositionAndWeather({ commit, dispatch }) {
      const onSuccess = (pos) => {
        commit(mutationTypes.SAVE_COORDINATES, pos.coords);
        dispatch('getCurrentPositionKey');
      };

      const onError = (error) => {
        commit(mutationTypes.SAVE_ERROR_DESC, utils.getReadableErrorDesc(error));
      };

      const options = {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      };
      if (!navigator.geolocation) {
        commit(mutationTypes.SAVE_ERROR_DESC, 'Ваш браузер не підтримує геолокацію');
        return;
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    },

    getCurrentPositionKey({ commit, state, dispatch }) {
      const currentPositionAPIUrl = utils.getCurrentPositionAPIUrl({
        latitude: state.currentPosition.latitude,
        longitude: state.currentPosition.longitude,
        APIkey: process.env.VUE_APP_ACCUWEATHER_KEY,
      });
      fetch(currentPositionAPIUrl)
        .then((response) => {
          if (response.ok) return response.json();
          commit(mutationTypes.SAVE_ERROR_DESC, response.statusText);
          throw new Error(`HTTP error, status = ${response.status}`);
        })
        .then((positionJson) => {
          if (positionJson.Key) {
            commit(mutationTypes.SAVE_CURRENT_POSITION_DATA, {
              Key: positionJson.Key,
              City: positionJson.LocalizedName,
            });
            dispatch('getCurrentWeatherData');
            return;
          }
          commit(mutationTypes.SAVE_ERROR_DESC, 'Помилка при отриманні поточної погоди');
        });
    },

    getCurrentWeatherData({ commit, state }) {
      const currentWeatherUrl = utils.getCurrentWeatherAPIUrl({
        positionKey: state.currentPosition.positionKey,
        APIkey: process.env.VUE_APP_ACCUWEATHER_KEY,
      });
      fetch(currentWeatherUrl)
        .then((response) => {
          if (response.ok) return response.json();
          commit(mutationTypes.SAVE_ERROR_DESC, response.statusText);
          throw new Error(`HTTP error, status = ${response.status}`);
        })
        .then((currentWeatherJson) => {
          const currentWeatherForStore = utils.translateJSONToCurrentWeather(currentWeatherJson[0]);
          currentWeatherForStore.dataLoadedFromAPI = true;
          commit(mutationTypes.SAVE_WEATHER, currentWeatherForStore);
        });
    },
  },
  plugins: [localStoragePlugin],
});
