<template functional>
  <div class="current-weather">
    <h2 class="current-weather__city">{{ props.currentPosition.city }}</h2>
    <div class="current-weather__row">
      <h2 class="current-weather__temperature">
        <span class="current-weather__temperature-digit">{{ props.weather.temperature }}</span>
        °C
      </h2>
      <img class="current-weather__icon" alt="weather icon" :src="props.weather.icon" />
    </div>
    <div class="current-weather__row">
      <p class="current-weather__description">
        {{ props.weather.description }}
      </p>
      <div class="current-weather__wind-container">
        <div class="current-weather__wind-caption">вітер:</div>
        <div
          v-if="props.weather.windSpeed"
          :style="{ transform: `rotate(${props.weather.windDirectionDeg}deg)` }"
          class="current-weather__wind-direction"
        >
          <div
            :style="{ background: props.weather.windBackgroundColor }"
            class="current-weather__wind-direction-inner"
          ></div>
        </div>
        <div v-if="props.weather.windSpeed" class="current-weather__wind-caption">
          {{ props.weather.windDirection }}, {{ props.weather.windSpeed }} м/с
        </div>
        <div v-else class="current-weather__wind-caption">штиль</div>
      </div>
    </div>
    <div class="current-weather__row">
      <p class="current-weather__info">
        відчувається як:
        <strong>
          {{ props.weather.realFeelTemperature }}
        </strong>
        °C
        <span v-if="props.weather.isDayTime">
          у затінку:
          <strong>
            {{ props.weather.realFeelTemperatureShade }}
          </strong>
          °C
        </span>
      </p>
    </div>
    <div class="current-weather__row">
      <p class="current-weather__info">
        тиск:
        <strong>{{ props.weather.pressure }}</strong>
        мм.рт.ст, {{ props.weather.pressureTendency }}
      </p>
      <p v-if="props.weather.precipitationType" class="current-weather__info">
        опади: {{ props.weather.precipitationType }}
      </p>
    </div>
    <div class="current-weather__row">
      <a
        :href="props.weather.detailsURL"
        target="_blank"
        rel="noopener noreferrer"
        class="current-weather__datetime"
      >
        accuweather.com
      </a>
    </div>
    <div class="current-weather__row">
      <p class="current-weather__datetime">
        Останнє оновлення:
        {{ props.weather.dateTimeStamp | distanceToNowInWords }} тому
      </p>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';

export default {
  name: 'CurrentWeather',
  props: ['weather', 'currentPosition'],
  filters: {
    distanceToNowInWords: dateTimeStamp => formatDistanceToNow(dateTimeStamp, { locale: uk }),
  },
};
</script>

<style lang="scss" scoped>
.current-weather {
  width: 100%;
  max-width: 480px;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: thick double #32a1ce;

  &__row {
    width: 100%;
    padding: 3px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__icon {
    width: 120px;
    height: 120px;
  }

  &__datetime {
    font-family: Roboto, sans-serif;
    color: dimgray;
    font-size: 12px;
  }

  &__city {
    padding-top: 4px;
    font-family: Oswald, sans-serif;
    font-size: 16px;
  }

  &__temperature {
    font-family: Oswald, sans-serif;
    font-weight: 600;
    font-size: 40px;
  }

  &__temperature-digit {
    font-family: Oswald, sans-serif;
    font-weight: 600;
    font-size: 80px;
  }

  &__info {
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }

  &__wind-container {
    display: flex;
    align-items: center;
  }

  &__wind-direction {
    padding: 0 5px;
  }

  &__wind-direction-inner {
    mask-image: url(location-arrow-solid.svg);
    mask-size: cover;
    transform: rotate(135deg);
    width: 17px;
    height: 17px;
  }

  &__description {
    text-align: center;
    padding: 3px 0;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
