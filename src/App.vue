<template>
  <div id="app">
    <CurrentWeather :weather="currentWeather" :address="currentAddress" v-if="isWeatherGot"/>
    <h2 v-else-if="errorDesc" class="weather-container__no-pos">{{errorDesc}}</h2>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
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
    ...mapState(['currentWeather', 'errorDesc', 'currentAddress']),
    ...mapGetters(['isWeatherGot']),
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
