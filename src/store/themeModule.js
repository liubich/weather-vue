import * as mutationTypes from './mutationTypes';
// eslint-disable-next-line import/prefer-default-export
export const themeModule = {
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
