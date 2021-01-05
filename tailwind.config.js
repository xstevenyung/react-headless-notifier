module.exports = {
  prefix: 'react-headless-notifier-',
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false,
    boxShadow: false,
    ringWidth: false,
  },
  theme: {
    extend: {
      animation: {
        'enter-right': 'enter-right 0.2s ease-in-out',
        'exit-right': 'exit-right 0.2s ease-in-out forwards',
      },
      keyframes: {
        'enter-right': {
          from: { opacity: 0, transform: 'translateX(300px)' },
          to: { opacity: 1, transform: 'translateX(0px)' },
        },
        'exit-right': {
          from: { opacity: 1, transform: 'translateX(0px)' },
          to: { opacity: 0, transform: 'translateX(300px)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
