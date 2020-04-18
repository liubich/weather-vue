import getAPIData from '../apiutils';

const APP_ID = process.env.VUE_APP_WEATHERUNLOCKED_APP_ID;
const KEY = process.env.VUE_APP_WEATHERUNLOCKED_KEY;

export default async function getHourlyForecastFromAPI({ latitude, longitude }) {
  const hourlyForecastAPIUrl = `http://api.weatherunlocked.com/api/forecast/${latitude},${longitude}?app_id=${APP_ID}&app_key=${KEY}`;
  getAPIData(hourlyForecastAPIUrl);
}
