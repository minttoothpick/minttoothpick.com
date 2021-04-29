const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Merge all tags: https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  /**
   * Additional folders to copy to output folder
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/images");

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
