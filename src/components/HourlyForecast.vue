<template functional>
  <div class="hourly-forecast">
    <table class="hourly-forecast__data-table data-table">
      <tbody>
        <tr>
          <th class="data-table__headings-column">День тижня</th>
          <th class="data-table__day-row" :colspan="props.weather.numberOfTodayColumns">
            Сьогодні
          </th>
          <th class="data-table__day-row" :colspan="props.weather.numberOfTomorrowColumns">
            Завтра
          </th>
          <th class="data-table__day-row" :colspan="props.weather.numberOfPastTomorrowColumns">
            Післязавтра
          </th>
        </tr>
        <tr>
          <th class="data-table__headings-column">Час</th>
          <th
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__time cell"
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
          >
            {{ hourForecast.time }}
          </th>
        </tr>
        <tr>
          <td class="data-table__headings-column">Опис погоди</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__icon icon cell"
            :data-tooltip="hourForecast.weatherDescription"
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
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
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
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
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
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
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
          >
            {{ hourForecast.pressure }}
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Вітер: швидкість, м/с</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__wind-speed cell"
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
          >
            {{ hourForecast.windSpeed }}
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Пориви, м/с</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__wind-gust-speed cell"
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
          >
            {{ hourForecast.windGustSpeed }}
          </td>
        </tr>
        <tr>
          <td class="data-table__headings-column">Напрямок</td>
          <td
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__wind cell"
            v-bind:class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
          >
            <div
              class="data-table__wind-direction"
              :style="{
                transform: `rotate(${hourForecast.windDirectionDeg}deg)`,
              }"
            >
              <div
                class="data-table__wind-direction-inner"
                :style="{ background: hourForecast.windBackgroundColor }"
              ></div>
            </div>
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
  border-collapse: collapse;
  border: 2px solid #b2b2b2;

  &__day-row {
    padding: 4px 10px;
    text-align: left;
    border-top: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    border-left: 2px solid #b2b2b2;
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 12px;
  }

  &__headings-column {
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    padding: 4px 10px;
    white-space: nowrap;
    text-align: right;
    border-right: 2px solid #b2b2b2;
    background-color: rgb(243, 243, 243);
  }

  &__time {
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 12px;
    padding: 4px 10px;
  }

  &__pressure,
  &__temperature,
  &__feels-like,
  &__wind-speed,
  &__wind-gust-speed {
    padding: 4px 10px;
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

  &__wind {
    border-top: 1px solid #b2b2b2;
    padding: 6px;

    &-direction {
      margin: 0 auto;
      width: 17px;
      height: 17px;

      &-inner {
        mask-image: url(location-arrow-solid.svg);
        mask-size: cover;
        transform: rotate(135deg);
        width: 17px;
        height: 17px;
      }
    }
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

  .cell_shadow {
    background-color: #f4f4f4;
  }
}
</style>
