<template>
  <div
    id="app"
    :style="
      'color: ' +
        getMainTextColor +
        '; background-color: ' +
        getMainBackColor +
        '; --shadow-back-color: ' +
        getShadowBackColor +
        '; --shadow-text-color: ' +
        getShadowTextColor
    "
  >
    <CurrentWeather
      :weather="currentWeather"
      :currentPosition="currentPosition"
      v-if="isCurrentWeatherGot"
    />
    <h2 v-else-if="errorDesc" class="weather-container__no-pos">
      {{ errorDesc }}
    </h2>
    <h2 class="weather-container__loading" v-else>Завантаження</h2>
    <HourlyForecast v-if="isHourlyForecastGot" :weather="hourlyForecast" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import CurrentWeather from './components/CurrentWeather.vue';
import HourlyForecast from './components/HourlyForecast.vue';

export default {
  name: 'app',
  created() {
    this.getCurrentPositionAndWeather();
  },
  components: {
    CurrentWeather,
    HourlyForecast,
  },
  computed: {
    ...mapState(['currentWeather', 'errorDesc', 'currentPosition', 'hourlyForecast']),
    ...mapGetters([
      'isCurrentWeatherGot',
      'isHourlyForecastGot',
      'getMainTextColor',
      'getShadowTextColor',
      'getMainBackColor',
      'getShadowBackColor',
    ]),
  },
  methods: {
    ...mapActions(['getCurrentPositionAndWeather']),
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-container__no-pos,
.weather-container__loading {
  text-align: center;
}
</style>
