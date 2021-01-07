module.exports = {
  prefix: 'react-headless-notifier-',
  purge: {
    enabled: process.env.NODE_ENV !== 'production',
    content: ['./src/**/*.tsx'],
  },
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

        'enter-left': 'enter-left 0.2s ease-in-out',
        'exit-left': 'exit-left 0.2s ease-in-out forwards',

        'enter-top': 'enter-top 0.2s ease-in-out',
        'exit-top': 'exit-top 0.2s ease-in-out forwards',

        'enter-bottom': 'enter-bottom 0.2s ease-in-out',
        'exit-bottom': 'exit-bottom 0.2s ease-in-out forwards',
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

        'enter-left': {
          from: { opacity: 0, transform: 'translateX(-300px)' },
          to: { opacity: 1, transform: 'translateX(0px)' },
        },
        'exit-left': {
          from: { opacity: 1, transform: 'translateX(0px)' },
          to: { opacity: 0, transform: 'translateX(-300px)' },
        },

        'enter-top': {
          from: { opacity: 0, transform: 'translateY(-200px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
        },
        'exit-top': {
          from: { opacity: 1, transform: 'translateY(0px)' },
          to: { opacity: 0, transform: 'translateY(-200px)' },
        },

        'enter-bottom': {
          from: { opacity: 0, transform: 'translateY(200px)' },
          to: { opacity: 1, transform: 'translateY(0px)' },
        },
        'exit-bottom': {
          from: { opacity: 1, transform: 'translateY(0px)' },
          to: { opacity: 0, transform: 'translateY(200px)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
