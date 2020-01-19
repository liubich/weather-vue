import * as utils from '../utils';
import * as mutationTypes from '../mutationTypes';
// eslint-disable-next-line import/prefer-default-export
export const saveCurrentPosition = async (state, commit) => {
  const getCurrentPositionAPIUrl = ({ latitude, longitude, APIkey }) =>
    `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${APIkey}&q=${latitude},${longitude}&language=uk-ua`;

  const currentPositionAPIUrl = getCurrentPositionAPIUrl({
    latitude: state.currentPosition.latitude,
    longitude: state.currentPosition.longitude,
    APIkey: process.env.VUE_APP_ACCUWEATHER_KEY,
  });
  const positionJson = await utils.getAPIData(currentPositionAPIUrl, commit);
  if (positionJson.Key) {
    commit(mutationTypes.SAVE_CURRENT_POSITION_DATA, {
      Key: positionJson.Key,
      City: positionJson.LocalizedName,
      dataLoadedFromAPI: true,
    });
    return;
  }
  commit(mutationTypes.SAVE_ERROR_DESC, 'Помилка при отриманні поточної погоди');
};
