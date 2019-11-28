<template functional>
  <div class="hourly-forecast">
    <div class="hourly-forecast__column column"></div>
  </div>
</template>

<script>
export default {
  name: 'HourlyForecast',
  props: ['weather',],
};
</script>

<style lang="scss" scoped>
.hourly-forecast {
  width: 100%;
  max-width: 480px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  // flex-direction: column;
  border: thick double #32a1ce;
}
</style>
