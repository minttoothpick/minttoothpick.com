const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  /**
   * Merge all tags
   *
   * https://www.11ty.dev/docs/data-deep-merge/
   */
  eleventyConfig.setDataDeepMerge(true);

  /**
   * Format Dates and Times with Luxon
   *
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   */
   eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "America/New_York" }).toFormat("LLLL dd, yyyy");
  });

  /**
   * Additional folders to copy to output folder
   *
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/images");

  /**
   * Override default input/output directories
   *
   * https://www.11ty.dev/docs/config/
   */
  return {
    dir: {
      input: "src"
    }
  };

};
