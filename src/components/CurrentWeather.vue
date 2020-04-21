<template functional>
  <div class="current-weather">
    <h2 class="current-weather__header">Поточні спостереження</h2>
    <h2 class="current-weather__temperature">
      <span class="current-weather__temperature-digit">{{ props.weather.temperature }}</span>
      °C
    </h2>
    <img class="current-weather__icon" alt="weather icon" :src="props.weather.icon" />
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
    <p class="current-weather__feel-like">
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
    <p class="current-weather__pressure">
      тиск:
      <strong>{{ props.weather.pressure }}</strong>
      мм.рт.ст, {{ props.weather.pressureTendency }}
    </p>
    <p v-if="props.weather.precipitationType" class="current-weather__precipitation">
      опади: {{ props.weather.precipitationType }}
    </p>
    <p class="current-weather__link">
      деталі:
      <a
        :href="props.weather.detailsURL"
        target="_blank"
        rel="noopener noreferrer"
        class="current-weather__link"
      >
        accuweather.com
      </a>
    </p>

    <p class="current-weather__last-refresh">
      Останнє спостереження:
      {{ props.weather.dateTimeStamp | distanceToNowInWords }} тому
    </p>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';

export default {
  name: 'CurrentWeather',
  props: ['weather', 'currentPosition'],
  filters: {
    distanceToNowInWords: (dateTimeStamp) => formatDistanceToNow(dateTimeStamp, { locale: uk }),
  },
};
</script>

<style lang="scss" scoped>
.current-weather {
  width: 100%;
  background-color: var(--additional-back-color, #8cceea);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'head head head'
    'image temp wind'
    'image temp pressure'
    'image temp precip'
    'descr feel-like .'
    'link link link'
    'last-refr last-refr last-refr';

  &__header {
    grid-area: head;
    text-align: center;
    font-family: Oswald, sans-serif;
    font-size: 17px;
  }

  &__icon {
    grid-area: image;
    margin: 0 auto;
    width: 120px;
    height: 120px;
  }

  &__link {
    grid-area: link;
    padding: 5px;
    text-align: right;
    font-family: Roboto, sans-serif;
    color: var(--shadow-text-color, dimgray);
    font-size: 12px;
  }

  &__last-refresh {
    grid-area: last-refr;
    padding: 5px;
    text-align: right;
    font-family: Roboto, sans-serif;
    color: var(--shadow-text-color, dimgray);
    font-size: 12px;
  }

  &__temperature {
    grid-area: temp;
    text-align: center;
    font-family: Oswald, sans-serif;
    font-weight: 600;
    font-size: 40px;
  }

  &__temperature-digit {
    font-family: Oswald, sans-serif;
    font-weight: 600;
    font-size: 80px;
  }

  &__feel-like {
    grid-area: feel-like;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }

  &__pressure {
    grid-area: pressure;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }

  &__wind-container {
    grid-area: wind;
    display: flex;
    align-items: flex-start;
    justify-content: center;
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
    grid-area: descr;
    padding: 5px;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-weight: bold;
    font-size: 20px;
  }

  &__precipitation {
    grid-area: precip;
    text-align: center;
    font-family: Roboto, sans-serif;
    font-size: 12px;
  }
}

@media screen and (max-width: 450px) {
  .current-weather {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'city city'
      'head head'
      'image temp '
      'image feel-like '
      'descr wind'
      '. pressure'
      'link link'
      'last-refr last-refr';

    &__precipitation {
      display: none;
    }
  }
}
</style>
