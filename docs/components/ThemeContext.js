import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useNotifier } from '../../';
import twThemes from '../themes';

export const defaultTitle = 'Well, hello there';
export const defaultMessage =
  'This is a demo notification, you can customize it live in the editor!';

export const TAILWIND = 'Tailwind.css';
export const CSS = 'Plain CSS';

const types = [TAILWIND, CSS];

import {
  InfoVueNotification as PlainCSSInfoVueNotification,
  SuccessVueNotification as PlainCSSSuccessVueNotification,
  WarningVueNotification as PlainCSSWarningVueNotification,
  DangerVueNotification as PlainCSSDangerVueNotification,
} from './PlainCSSTheme';

const cssThemes = {
  vue: [
    PlainCSSInfoVueNotification,
    PlainCSSSuccessVueNotification,
    PlainCSSWarningVueNotification,
    PlainCSSDangerVueNotification,
  ],
};

const ThemeContext = createContext();

function ThemeContextProvider({ children }) {
  const [themeName, setThemeName] = useState('demo');

  const [type, setType] = useState(TAILWIND);

  const availableThemes = useMemo(() => {
    if (type === TAILWIND) {
      setThemeName(Object.keys(twThemes)[0]);
      return twThemes;
    }
    if (type === CSS) {
      setThemeName(Object.keys(cssThemes)[0]);
      return cssThemes;
    }
    throw new Error(`Selected unavailable theme type: ${type}`);
  }, [type]);

  const theme = useMemo(() => availableThemes[themeName], [
    availableThemes,
    themeName,
  ]);

  const { notify } = useNotifier();

  const notifyWithTheme = () => {
    theme.forEach(NotificationComponent => {
      notify(
        <NotificationComponent title={defaultTitle} message={defaultMessage} />,
      );
    });
  };

  useEffect(() => {
    notifyWithTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        availableThemes,
        theme,
        themeName,
        setThemeName,
        notifyWithTheme,
        type,
        types,
        setType,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
export { ThemeContextProvider, useTheme };
