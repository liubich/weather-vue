import { SAVE_PREFERRED_THEME } from './mutationTypes';

export default {
  state: {
    osTheme: null,
    localStorageTheme: null,
    toggleTheme: null,
  },
  mutations: {
    [SAVE_PREFERRED_THEME](state, { theme, source }) {
      switch (source) {
        case 'os':
          state.osTheme = theme;
          break;
        case 'localstorage':
          state.localStorageTheme = theme;
          break;
        case 'toggle':
          state.toggleTheme = theme;
          break;
        default:
          break;
      }
    },
  },
  getters: {
    isDarkTheme: (state) =>
      state.toggleTheme === 'dark' ||
      (!state.toggleTheme && state.localStorageTheme === 'dark') ||
      (!state.toggleTheme && !state.localStorageTheme && state.osTheme === 'dark'),
  },
};
