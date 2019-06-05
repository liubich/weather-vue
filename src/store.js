import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getReadableErrorDesc = (error) => {
  const errorCodeToDescription = {
    [error.PERMISSION_DENIED]:
      'Будь ласка, надайте сторінці доступ до місцезнаходження',
    [error.POSITION_UNAVAILABLE]:
      'Недоступні дані про поточне місцезнаходження',
    [error.TIMEOUT]: 'Вийшов час для визначення місцезнаходження',
  };
  return errorCodeToDescription[error.code] || 'Невідома помилка';
};

const getFormattedDateStr = (UNIXdate) => {
  const reqDate = new Date(parseInt(UNIXdate, 10));
  return reqDate.toLocaleString('uk-UA', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const getWindDirection = (deg) => {
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

const getCurrentWeatherAPIUrl = ({ latitude, longitude, APIkey }) => `https://api.aerisapi.com/observations/${latitude},${longitude}?&format=json&filter=metar&limit=1&client_id=${APIkey.CLIENT_ID}&client_secret=${APIkey.CLIENT_SECRET}`;

const translateJSONToCurrentWeather = jsonResponse => ({
  icon: `https://cdn.aerisapi.com/wxblox/icons/${jsonResponse.ob.icon || 'na.png'}`,
  place: jsonResponse.place.name,
  countryCode: jsonResponse.place.country,
  temperature: Math.round(parseFloat(jsonResponse.ob.tempC)),
  description: jsonResponse.ob.weatherShort || 'Недоступно',
  dateTime: getFormattedDateStr(jsonResponse.ob.timestamp * 1000),
  windSpeed:
    Math.round((parseInt(jsonResponse.ob.windSpeedKPH, 10) / 3.6) * 10) / 10,
  windDirection: getWindDirection(parseInt(jsonResponse.ob.windDirDEG, 10)),
  windDirectionDeg: parseInt(jsonResponse.ob.windDirDEG, 10),
  pressure: parseInt(jsonResponse.ob.pressureMB, 10),
});


export default new Vuex.Store({
  state: {
    firstStart: true,
    APIkey: {
      CLIENT_ID: 'zovm6afV1sSFyuLDNutQn',
      CLIENT_SECRET: 'Zeee2pQAi37pofB9i6oYRq1b0iepGFc9r4cAjk43',
    },
    currentPosition: {},
    currentWeather: {},
    isWeatherGot: false,
    errorDesc: null,
  },
  mutations: {
    savePosition(state, currentPosition) {
      state.currentPosition = currentPosition;
    },
    saveCurrentWeather(state, currentWeather) {
      state.currentWeather = currentWeather;
      state.isWeatherGot = true;
    },
    saveErrDesc(state, errorDesc) {
      state.errorDesc = errorDesc;
    },
  },
  actions: {
    getCurrentPositionAndWeather({ commit, dispatch }) {
      const onSuccess = (pos) => {
        commit('savePosition', pos.coords);
        dispatch('getCurrentWeather');
      };

      const onError = (error) => {
        commit('saveErrDesc', getReadableErrorDesc(error));
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
      const currentWeatherUrl = getCurrentWeatherAPIUrl({
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
            commit('saveCurrentWeather', translateJSONToCurrentWeather(json.response));
            return;
          }
          commit('saveErrDesc', json.error);
        });
    },
  },
  computed: {
    currentWeather() {
      return this.$store.state.currentWeather;
    },
  },
});
