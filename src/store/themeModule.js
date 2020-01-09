import { SAVE_PREFERRED_THEME } from './mutationTypes';

export default {
  state: {
    preferredTheme: null,
  },
  mutations: {
    [SAVE_PREFERRED_THEME](state, preferredTheme) {
      state.preferredTheme = preferredTheme;
    },
  },
  getters: {
    isDarkTheme: state => state.preferredTheme === 'dark',
  },
};
