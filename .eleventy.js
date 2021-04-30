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
   * Markdown template processing
   *
   * https://www.11ty.dev/docs/languages/markdown/
   * https://github.com/markdown-it/markdown-it#init-with-presets-and-options
   */
  const markdownIt = require("markdown-it");
  const markdownItReplaceLink = require("markdown-it-replace-link");
  const markdownItOptions = {
    html: true, // Enable HTML tags in source
    linkify: true, // Autoconvert URL-like text to links
    typographer: true, // Nice quotes, etc.
    replaceLink: function (link, env) {
      // Set image paths to absolute
      if (link.startsWith("images")) {
        // Prepend local image links with correct path
        return "../../" + link;
      } else {
        return link;
      }
    }
  };
  const markdownLib = markdownIt(markdownItOptions).use(markdownItReplaceLink);
  eleventyConfig.setLibrary("md", markdownLib);

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
