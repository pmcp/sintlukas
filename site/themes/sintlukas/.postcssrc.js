const mqpacker = require('css-mqpacker')
const sortCSSmq = require('sort-css-media-queries')
const postcssPresetEnv = require('postcss-preset-env')
const csso = require('postcss-csso')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = ({ env }) => ({
  plugins: [
    // tailwindcss('./tailwind.js'),
    mqpacker({
      sort: sortCSSmq
    }),
    env === 'production' ? purgecss({
      content: [
        './layouts/*.html',
        './templates/**/*.html',
        './partials/**/*.html',
        './js/*.js'
      ]
    }) : false,
    env === 'production' ? csso({
      comments: false
    }) : false,
    postcssPresetEnv({
      features: {
        customProperties: {
          warnings: false
        }
      }
    })
  ]
})
