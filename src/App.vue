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
import { mapState, mapActions } from 'vuex';
import CurrentWeather from './components/CurrentWeather.vue';

export default {
  name: 'app',
  created() {
    this.getCurrentPositionAndWeather();
  },
  components: {
    CurrentWeather,
  },
  computed: {
    ...mapState(['currentWeather']),
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
  padding: 10px;
}
</style>
