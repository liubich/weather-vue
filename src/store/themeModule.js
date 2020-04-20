import { SAVE_PREFERRED_THEME } from './mutationTypes';

export default {
  state: {
    preferredTheme: {
      fromOs: null,
      fromLocalStorage: null,
      fromToggle: null,
    },
  },
  mutations: {
    [SAVE_PREFERRED_THEME]({ preferredTheme }, { theme, source }) {
      switch (source) {
        case 'os':
          preferredTheme.fromOs = theme;
          break;
        case 'localstorage':
          preferredTheme.fromLocalStorage = theme;
          break;
        case 'toggle':
          preferredTheme.fromToggle = theme;
          break;
        default:
          break;
      }
    },
  },
  getters: {
    isDarkTheme: ({ preferredTheme }) =>
      preferredTheme.fromToggle === 'dark' ||
      (!preferredTheme.fromToggle && preferredTheme.fromLocalStorage === 'dark') ||
      (!preferredTheme.fromToggle &&
        !preferredTheme.fromLocalStorage &&
        preferredTheme.fromOs === 'dark'),
  },
};
