module.exports = {
  purge: ['./src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  corePlugins: {
    preflight: false,
    boxShadow: false,
    ringWidth: false,
    animation: false,
  },
  theme: {
    screens: {},
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
