import * as mutationTypes from './mutationTypes';

export default function darkThemePlugin({ commit }) {
  if (!matchMedia) return;
  const preferDarkTheme = matchMedia('(prefers-color-scheme: dark)');

  function savePreferDarkThemeToStore(mql) {
    commit(mutationTypes.SAVE_PREFERRED_THEME, {
      theme: mql.matches ? 'dark' : 'light',
      source: 'os',
    });
  }
  savePreferDarkThemeToStore(preferDarkTheme);
  preferDarkTheme.addListener(savePreferDarkThemeToStore);
}
