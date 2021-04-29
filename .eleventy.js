const moment = require('moment');

moment.locale('en');

module.exports = function(eleventyConfig) {

  /**
   * Create Notes Collection
   * https://www.pborenstein.com/posts/collections/
   */
  eleventyConfig.addCollection('notes',
    collection => collection
      .getAllSorted()
      .filter(item => item.url
        && !item.inputPath.includes('index.njk')
        && item.inputPath.startsWith('./notes/')))

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

  /**
   * Override default input/output directories
   * https://www.11ty.dev/docs/config/
   */
  return {
    dir: {
      input: "src"
    }
  };

};
