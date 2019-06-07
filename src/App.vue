<template>
  <div id="app">
    <CurrentWeather :weather="currentWeather" v-if="this.$store.state.isWeatherGot"/>
    <h2
      v-else-if="this.$store.state.errorDesc"
      class="weather-container__no-pos"
    >{{this.$store.state.errorDesc}}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CurrentWeather from './components/CurrentWeather.vue';

export default {
  name: 'app',
  created() {
    this.$store.dispatch('getCurrentPositionAndWeather');
  },
  components: {
    CurrentWeather,
  },
  computed: {
    ...mapState(['currentWeather']),
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
  padding: 10px;
}
</style>
