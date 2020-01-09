import * as mutationTypes from './mutationTypes';

export default function darkThemePlugin({ commit }) {
  if (!matchMedia) return;
  const preferDarkTheme = matchMedia('(prefers-color-scheme: dark)');

  function savePreferDarkThemeToStore(mql) {
    commit(mutationTypes.SAVE_PREFERRED_THEME, mql.matches ? 'dark' : 'light');
  }
  savePreferDarkThemeToStore(preferDarkTheme);
  preferDarkTheme.addListener(savePreferDarkThemeToStore);
}
