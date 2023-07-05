import { watchEffect } from 'vue';
import { useStore } from '@nanostores/vue';
import { $themeStore, setTheme } from '~/stores/themeStore';

const theme = useStore($themeStore);

export function useThemeSwitcher() {
  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light');
  };

  watchEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme.value === 'dark') {
        window.document.documentElement.classList.add('dark');
      } else {
        window.document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme.value);
    }
  });

  return {
    theme,
    toggleTheme,
  };
}
