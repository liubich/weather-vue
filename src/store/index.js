import Vue from 'vue';
import Vuex from 'vuex';
import * as mutationTypes from './mutationTypes';
import * as utils from './utils';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    APIkey: 'xABfuuGRMZm5LKIzi08KAGZLqd2Eduov',
    currentPosition: {
      latitude: null,
      longitude: null,
      positionKey: null,
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
      pressure: null,
    },
    errorDesc: null,
  },
  mutations: {
    [mutationTypes.SAVE_POSITION](state, currentPosition) {
      state.currentPosition = currentPosition;
    },
    [mutationTypes.SAVE_WEATHER](state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    [mutationTypes.SAVE_ERROR_DESC](state, errorDesc) {
      state.errorDesc = errorDesc;
    },
  },
  getters: {
    isWeatherGot: state => !!state.currentWeather.description,
  },
  actions: {
    getCurrentPositionAndWeather({ commit, dispatch }) {
      const onSuccess = (pos) => {
        commit(mutationTypes.SAVE_POSITION, pos.coords);
        dispatch('getCurrentWeather');
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

    getCurrentWeather({ commit, state }) {
      const currentWeatherUrl = utils.getCurrentWeatherAPIUrl({
        latitude: state.currentPosition.latitude,
        longitude: state.currentPosition.longitude,
        APIkey: state.APIkey,
      });
      fetch(currentWeatherUrl)
        .then((response) => {
          if (response.ok) return response.json();
          commit(mutationTypes.SAVE_ERROR_DESC, response.statusText);
          throw new Error(`HTTP error, status = ${response.status}`);
        })
        .then((json) => {
          if (json.success) {
            commit(mutationTypes.SAVE_WEATHER, utils.translateJSONToCurrentWeather(json.response));
            return;
          }
          commit(mutationTypes.SAVE_ERROR_DESC, json.error);
        });
    },
  },
});
