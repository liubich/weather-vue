import Vue from 'vue';
import Vuex from 'vuex';
import * as mutationTypes from './mutationTypes';
import * as utils from './utils';
import localStoragePlugin from './localStoragePlugin';
import darkThemePlugin from './darkThemePlugin';
import themeModule from './themeModule';
import { saveCurrentPosition, saveCurrentConditions } from './weatherProviders/accuweather';
import saveHourlyForecast from './weatherProviders/weatherbit';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    themeModule,
  },
  state: {
    currentPosition: {
      latitude: null,
      longitude: null,
      positionKey: null,
      city: null,
      dataLoadedFromAPI: false,
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
    hourlyForecast: { dataLoadedFromAPI: false },
    errorDesc: null,
  },
  mutations: {
    [mutationTypes.SAVE_COORDINATES](state, currentPosition) {
      state.currentPosition.latitude = currentPosition.latitude;
      state.currentPosition.longitude = currentPosition.longitude;
    },
    [mutationTypes.SAVE_CURRENT_WEATHER](state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    [mutationTypes.SAVE_ERROR_DESC](state, errorDesc) {
      state.errorDesc = errorDesc;
    },
    [mutationTypes.SAVE_CURRENT_POSITION_DATA](state, currentPosition) {
      state.currentPosition.positionKey = currentPosition.Key;
      state.currentPosition.city = currentPosition.City;
      state.currentPosition.dataLoadedFromAPI = currentPosition.dataLoadedFromAPI;
    },
    [mutationTypes.SAVE_HOURLY_FORECAST](state, hourlyForecastData) {
      state.hourlyForecast = hourlyForecastData;
      state.hourlyForecast.dataLoadedFromAPI = true;
    },
  },
  getters: {
    isCurrentWeatherGot: state => !!state.currentWeather.description,
    isHourlyForecastGot: state => state.hourlyForecast.dataLoadedFromAPI,
  },
  actions: {
    getCurrentPositionAndWeather({ commit, dispatch }) {
      const onSuccess = pos => {
        commit(mutationTypes.SAVE_COORDINATES, pos.coords);
        dispatch('getCurrentPosition');
      };

      const onError = error => {
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

    async getCurrentPosition({ commit, state, dispatch }) {
      saveCurrentPosition(state, commit);
      dispatch('getCurrentWeatherData');
      dispatch('getHourlyForecastForCurrentLocation');
    },

    async getCurrentWeatherData({ commit, state }) {
      saveCurrentConditions(state, commit);
    },
    async getHourlyForecastForCurrentLocation({ commit, state }) {
      saveHourlyForecast(state, commit);
    },
  },
  plugins: [localStoragePlugin, darkThemePlugin],
});
