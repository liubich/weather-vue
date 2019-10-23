<template functional>
  <div class="hourly-forecast">
    <table class="hourly-forecast__data-table data-table">
      <tbody>
        <tr>
          <th class="data-table__headings-column">День тижня</th>
          <th
            v-for="(day, index) in props.weather.datesWithColumnsNumber"
            :key="index"
            class="data-table__day-row"
            :colspan="day.columnsNumber"
          >
            <div class="data-table__day" :data-tooltip="day.tooltipString">
              {{ day.displayString }}
            </div>
          </th>
        </tr>
        <tr>
          <th class="data-table__headings-column">Час</th>
          <th
            v-for="(hourForecast, index) in props.weather.data"
            :key="index"
            class="data-table__time cell"
            :class="{
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
            :class="{
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
            :class="{
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
            :class="{
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
            :class="{
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
            :class="{
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
            :class="{
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
            :class="{
              'cell_left-border': hourForecast.beginNextDay,
              cell_shadow: !hourForecast.isDayTime,
            }"
            :data-tooltip="hourForecast.windDirection"
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
$thin-border: 1px solid #b2b2b2;
$thick-border: 2px solid #b2b2b2;
$font: 12px Roboto, sans-serif;

@mixin tooltip {
  content: attr(data-tooltip);
  position: absolute;
  border: $thin-border;
  border-radius: 5px;
  background-color: white;
  padding: 2px 5px;
  font: $font;
  font-weight: bold;
  z-index: 1;
  opacity: 1;
  white-space: nowrap;
  box-shadow: 0 2px 1px #bcbcbc;
}

.hourly-forecast {
  padding: 5px;
  border: thick double #32a1ce;
  width: 100%;
  max-width: 480px;
  overflow-x: scroll;
}

.data-table {
  border-collapse: collapse;
  border: $thick-border;

  &__day-row {
    border-top: $thin-border;
    border-bottom: $thin-border;
    border-left: $thick-border;
    text-align: left;
  }

  &__day {
    position: relative;
    display: inline-block;
    padding: 4px 10px;
    font: $font;
    font-weight: 600;

    &:hover::after,
    &:focus::after {
      @include tooltip;

      top: 22px;
    }
  }

  &__headings-column {
    font: $font;
    font-weight: bold;
    padding: 4px 10px;
    white-space: nowrap;
    text-align: right;
    border-right: $thick-border;
    background-color: rgb(243, 243, 243);
  }

  &__time {
    font: $font;
    font-weight: bold;
    padding: 4px 10px;
  }

  &__pressure,
  &__temperature,
  &__feels-like,
  &__wind-speed,
  &__wind-gust-speed {
    padding: 4px 10px;
    font: $font;
    text-align: center;
    border-top: $thin-border;
  }

  &__temperature {
    font-weight: bold;
  }

  &__icon-image {
    width: 32px;
    height: 32px;
  }

  &__wind {
    position: relative;
    border-top: $thin-border;
    padding: 6px;

    &:hover::after,
    &:focus::after {
      @include tooltip;

      top: -20px;
    }

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
    border-top: $thin-border;

    &:hover::after,
    &:focus::after {
      @include tooltip;

      top: 36px;
    }
  }

  .cell_left-border {
    border-left: $thick-border;
  }

  .cell_shadow {
    background-color: #f4f4f4;
  }
}
</style>
