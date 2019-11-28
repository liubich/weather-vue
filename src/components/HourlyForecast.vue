<template functional>
  <div class="hourly-forecast">
    <div
      v-for="(hourForecast, index) in props.weather.data"
      :key="index"
      class="hourly-forecast__column column"
    >
      <div class="column__time">{{ hourForecast.time }}</div>
      <div class="column__icon-wrapper">
        <img :src="hourForecast.icon" alt="weather icon" class="column__icon" />
      </div>
      <div class="column__temperature">{{ hourForecast.temperature }}</div>
      <div class="column__appearing-temperature">
        {{ hourForecast.appearingTemperature }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HourlyForecast',
  props: ['weather'],
};
</script>

<style lang="scss" scoped>
.hourly-forecast {
  width: 100%;
  max-width: 480px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  border: thick double #32a1ce;
  overflow-x: scroll;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: black solid 1px;

  &__time {
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    padding: 2px 10px;
  }

  &__temperature {
    padding: 2px 10px;
  }

  &__icon {
    width: 32px;
    height: 32px;
  }
}
</style>
