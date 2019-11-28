<template functional>
  <div class="hourly-forecast">
    <table class="hourly-forecast__data-table data-table">
      <tbody>
        <th class="data-table__headings-column">Час</th>
        <th
          v-for="(hourForecast, index) in props.weather.data"
          :key="index"
          class="data-table__time cell"
          v-bind:class="{ 'cell_left-border': hourForecast.beginNextDay }"
        >
          {{ hourForecast.time }}
        </th>
        <tr>
          <td class="data-table__headings-column">Опис погоди</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__icon icon cell"
            :data-tooltip="hourForecast.weatherDescription"
            v-bind:class="{ 'cell_left-border': hourForecast.beginNextDay }"
          >
            <img :src="hourForecast.icon" alt="weather icon" class="data-table__icon-image" />
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Температура, °C</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__temperature cell"
            v-bind:class="{ 'cell_left-border': hourForecast.beginNextDay }"
          >
            {{ hourForecast.temperature }}
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Відчувається як, °C</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__feels-like cell"
            v-bind:class="{ 'cell_left-border': hourForecast.beginNextDay }"
          >
            {{ hourForecast.appearingTemperature }}
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Тиск, мм.рт.ст</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__pressure cell"
            v-bind:class="{ 'cell_left-border': hourForecast.beginNextDay }"
          >
            {{ hourForecast.pressure }}
          </td>
        </tr>
      </tbody>
    </table>
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
  padding: 5px;
  border: thick double #32a1ce;
  width: 100%;
  max-width: 480px;
  overflow-x: scroll;
}

.data-table {
  &__headings-column {
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    padding: 2px 10px;
    white-space: nowrap;
    text-align: right;
    border-right: 1px solid #b2b2b2;
    background-color: rgb(243, 243, 243);
  }

  &__time {
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    padding: 2px 10px;
  }

  &__pressure,
  &__temperature,
  &__feels-like {
    padding: 2px 10px;
    font-family: Roboto, sans-serif;
    font-size: 12px;
    text-align: center;
    border-top: 1px solid #b2b2b2;
  }

  &__temperature {
    font-weight: bold;
  }

  &__icon-image {
    width: 32px;
    height: 32px;
  }

  .icon[data-tooltip] {
    position: relative;
    padding: 4px 10px;
    border-top: 1px solid #b2b2b2;

    &:hover::after,
    &:focus::after {
      content: attr(data-tooltip);
      position: absolute;
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

  .cell_left-border {
    border-left: 2px solid #b2b2b2;
  }
}
</style>
