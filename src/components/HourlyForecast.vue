<template functional>
  <div class="hourly-forecast">
    <div
      v-for="(hourForecast, index) in props.weather"
      :key="index"
      class="hourly-forecast__column column"
    >
      <div>{{ props.weather[index].temp }}</div>
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
}

.column {
  display: flex;
  flex-direction: column;
}
</style>