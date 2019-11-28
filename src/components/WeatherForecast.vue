<template functional>
  <div class="weather-forecast"></div>
</template>

<script>
export default {
  name: 'WeatherForecast',
  props: ['weather', 'currentPosition'],
};
</script>

<style lang="scss" scoped>
.weather-forecast {
  width: 100%;
  max-width: 480px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: thick double #32a1ce;
}
</style>
