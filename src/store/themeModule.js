import * as mutationTypes from './mutationTypes';

export default {
  state: {
    preferDarkTheme: null,
  },
  mutations: {
    [mutationTypes.SAVE_PREFER_DARK_THEME](state, preferDarkTheme) {
      state.preferDarkTheme = preferDarkTheme;
    },
  },
  getters: {
    isDarkTheme: state => state.preferDarkTheme,
  },
};
