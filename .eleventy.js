const moment = require('moment');

moment.locale('en');

module.exports = function(eleventyConfig) {

  /**
   * Format dates nicely with moment.js
   * https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
   */
  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).format('LL');
  });

  /**
   * Additional folders to copy to output folder
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("images");

};
