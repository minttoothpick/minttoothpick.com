const { DateTime } = require("luxon");
const dotenv = require("dotenv").config();

module.exports = function(eleventyConfig) {

  /**
   * Merge all tags
   *
   * https://www.11ty.dev/docs/data-deep-merge/
   */
  eleventyConfig.setDataDeepMerge(true);

  /* Filters
   ======================================================================== */

  /**
   * Format Dates and Times with Luxon
   *
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   * https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   */
   eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "America/New_York" }).toFormat("LLLL d, yyyy");
  });

  /* Collections
   ======================================================================== */

  /**
   * Finished books
   */
  eleventyConfig.addCollection("booksRead", (collection) => {
    const myBooks = collection.getAll()[0].data.books.items;
    // Include only books with a finish date
    const myBooksFiltered = myBooks.filter((d) => (((d.gsx$finish.$t).length > 0) && (d.gsx$finish.$t) != "Reading") && ((d.gsx$finish.$t) != "Shelved"));
    // Sort books by date finished
    return myBooksFiltered.sort((a, b) => (b.gsx$finish.$t) > (a.gsx$finish.$t) ? 1 : -1);
  });

  /**
   * Books in progress
   */
  eleventyConfig.addCollection("booksReading", (collection) => {
    const myBooks = collection.getAll()[0].data.books.items;
    // Include only books currently marked "Reading"
    const myBooksFiltered = myBooks.filter((d) => (d.gsx$finish.$t) == "Reading");
    // Sort books by date started
    return myBooksFiltered.sort((a, b) => (b.gsx$start.$t) > (a.gsx$start.$t) ? 1 : -1);
  });

  /* Plugins
   ======================================================================== */
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

  /* Misc.
   ======================================================================== */
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
