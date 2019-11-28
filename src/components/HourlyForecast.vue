<template functional>
  <div class="hourly-forecast">
    <div class="hourly-forecast__column-captions column">
      <div class="captions-column__time">Час</div>
      <div class="captions-column__icon-caption">Опис</div>
      <div class="captions-column__temperature">Температура</div>
      <div class="captions-column__appearing-temperature">Відчувається як</div>
      <div class="captions-column__pressure">Тиск</div>
    </div>
    <div class="hourly-forecast__data-columns">
      <div
        v-for="(hourForecast, index) in props.weather.data"
        :key="index"
        class="hourly-forecast__column column"
      >
        <div class="column__time">{{ hourForecast.time }}</div>
        <div class="column__icon icon" :data-tooltip="hourForecast.weatherDescription">
          <img :src="hourForecast.icon" alt="weather icon" class="column__icon-image" />
        </div>
        <div class="column__temperature">{{ hourForecast.temperature }}</div>
        <div class="column__appearing-temperature">
          {{ hourForecast.appearingTemperature }}
        </div>
        <div class="column__pressure">{{ hourForecast.pressure }}</div>
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
  display: flex;
  padding: 5px;
  border: thick double #32a1ce;
  width: 100%;
  max-width: 480px;
}

.hourly-forecast__data-columns {
  display: flex;
  align-items: flex-start;
  overflow-x: scroll;
}

.captions-column {
  &__icon-caption {
    height: 36px;
    padding: 2px 10px;
    font: bold 12px/36px Roboto, sans-serif;
    white-space: nowrap;
  }

  &__time,
  &__pressure,
  &__temperature,
  &__appearing-temperature {
    padding: 2px 0;
    font: bold 12px Roboto, sans-serif;
    white-space: nowrap;
  }
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

  &__pressure,
  &__temperature,
  &__appearing-temperature {
    padding: 2px 10px;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }

  &__icon-image {
    width: 32px;
    height: 32px;
  }

  .icon[data-tooltip] {
    position: relative;

    &:hover::after,
    &:focus::after {
      content: attr(data-tooltip);
      position: absolute;
      left: -50%;
      top: 36px;
      border: 1px solid #cecece;
      border-radius: 5px;
      background-color: white;
      padding: 2px 5px;
      font-family: Roboto, sans-serif;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
      opacity: 1;
      white-space: nowrap;
      box-shadow: 0 2px 1px #bcbcbc;
    }
  }
}
</style>
