import Vue from 'vue';
import Vuex from 'vuex';
import * as utils from './utils';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    APIkey: {
      CLIENT_ID: 'zovm6afV1sSFyuLDNutQn',
      CLIENT_SECRET: 'Zeee2pQAi37pofB9i6oYRq1b0iepGFc9r4cAjk43',
    },
    currentPosition: {
      latitude: null,
      longitude: null,
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
    savePosition(state, currentPosition) {
      state.currentPosition = currentPosition;
    },
    saveCurrentWeather(state, currentWeather) {
      state.currentWeather = currentWeather;
    },
    saveErrDesc(state, errorDesc) {
      state.errorDesc = errorDesc;
    },
  },
  getters: {
    isWeatherGot: state => !!state.currentWeather.description,
  },
  actions: {
    getCurrentPositionAndWeather({ commit, dispatch }) {
      const onSuccess = (pos) => {
        commit('savePosition', pos.coords);
        dispatch('getCurrentWeather');
      };

      const onError = (error) => {
        commit('saveErrDesc', utils.getReadableErrorDesc(error));
      };

      const options = {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      };
      if (!navigator.geolocation) {
        commit('saveErrDesc', 'Ваш браузер не підтримує геолокацію');
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
          commit('saveErrDesc', response.statusText);
          throw new Error(`HTTP error, status = ${response.status}`);
        })
        .then((json) => {
          if (json.success) {
            commit('saveCurrentWeather', utils.translateJSONToCurrentWeather(json.response));
            return;
          }
          commit('saveErrDesc', json.error);
        });
    },
  },
});
