import { atom, action } from 'nanostores';

export const $themeStore = atom(localStorage.getItem('theme') ?? 'dark');

export const setTheme = action($themeStore, 'setTheme', (store, theme) => {
  store.set(theme);
});
