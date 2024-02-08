// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-import'), 
      ],
      tailwindcss: { config: './tailwindcss-config.js' },
    },
  },
}
