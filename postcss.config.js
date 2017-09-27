module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 4 versions']
    }),
    require('css-mqpacker'),
    require('postcss-discard-comments'),
    // require('postcss-zindex'),
    require('postcss-discard-unused'),
    require('postcss-discard-empty'),
    require('postcss-discard-duplicates')
  ]
};
