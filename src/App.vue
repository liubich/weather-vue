<template>
  <div id="app" :class="isDarkTheme ? 'theme-dark' : 'theme-light'">
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
    ...mapGetters(['isCurrentWeatherGot', 'isHourlyForecastGot', 'isDarkTheme']),
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
  color: var(--main-text-color);
  background-color: var(--main-back-color);
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

<style>
.theme-light {
  --main-text-color: black;
  --shadow-text-color: dimgray;
  --main-back-color: white;
  --shadow-back-color: #f4f4f4;
}

.theme-dark {
  --main-text-color: darkgreen;
  --shadow-text-color: #115011;
  --main-back-color: #222;
  --shadow-back-color: black;
}
</style>
