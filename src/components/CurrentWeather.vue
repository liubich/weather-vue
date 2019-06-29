<template functional>
  <div class="current-weather">
    <p class="current-weather__datetime">Останнє оновлення: {{props.weather.dateTime}}</p>
    <h2 :v-if="props.currentPosition" class="current-weather__header">{{props.currentPosition.city}}</h2>
    <div class="current-weather__columns-container">
      <div class="current-weather__left-column column">
        <h2 class="current-weather__temperature">
          <span class="current-weather__temperature-digit">{{props.weather.temperature}}</span>
          °C
        </h2>
        <p class="current-weather__description">{{props.weather.description}}</p>
      </div>
      <div class="current-weather__middle-column column">
        <img alt="weather icon" :src="props.weather.icon">
      </div>
      <div class="current-weather__right-column column">
        <div class="current-weather__wind-container">
          <div class="current-weather__wind-caption">вітер:</div>
          <div
            v-if="props.weather.windSpeed"
            :style="{transform: `rotate(${props.weather.windDirectionDeg}deg)`}"
            class="current-weather__wind-direction"
          >&#8681;</div>
          <div v-if="props.weather.windSpeed" class="current-weather__wind-caption">
            {{props.weather.windDirection}} ,
            {{props.weather.windSpeed}} м/с
          </div>
          <div v-else class="current-weather__wind-caption">штиль</div>
        </div>
        <p class="current-weather__pressure">
          тиск:
          {{props.weather.pressure}} гПа
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentWeather',
  props: ['weather', 'currentPosition'],
};
</script>

<style scoped>
.current-weather {
  max-width: 540px;
  margin: 0 auto;
  padding: 5px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border: thick double #32a1ce;
}

.current-weather__datetime {
  font-family: Roboto, sans-serif;
  color: dimgray;
  font-size: 12px;
}

.current-weather__header {
  padding-top: 4px;
  align-self: center;
  font-family: Oswald, sans-serif;
  font-weight: 600;
  font-size: 24px;
  text-transform: uppercase;
}

.current-weather__columns-container {
  display: flex;
  flex-wrap: wrap;
}

.column {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.current-weather__left-column,
.current-weather__middle-column {
  align-items: center;
}

.current-weather__right-column,
.current-weather__left-column {
  justify-content: flex-end;
}

.current-weather__img-container {
  display: flex;
}

.current-weather__temperature {
  padding-left: 4px;
  font-family: Oswald, sans-serif;
  font-weight: 600;
  font-size: 30px;
}

.current-weather__temperature-digit {
  font-family: Oswald, sans-serif;
  font-weight: 600;
  font-size: 50px;
}

.current-weather__pressure {
  padding: 3px 0;
  font-family: Roboto, sans-serif;
  font-size: 14px;
}

.current-weather__wind-container {
  display: flex;
  align-items: center;
}

.current-weather__wind-caption {
  font-family: Roboto, sans-serif;
  font-size: 14px;
}

.current-weather__wind-direction {
  padding: 0 5px;
  font-family: Roboto, sans-serif;
  font-size: 24px;
}

.current-weather__description {
  text-align: center;
  padding: 3px 0;
  font-family: Roboto, sans-serif;
  font-weight: bold;
  font-size: 20px;
}
</style>
