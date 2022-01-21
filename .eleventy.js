const { DateTime } = require("luxon");
const dotenv = require("dotenv").config();
const markdownIt = require("markdown-it");
const markdownOptions = {
  html: true,
  linkify: true,
  typographer: true,
};
const markdownItAnchor = require("markdown-it-anchor");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const yaml = require("js-yaml");

// Import filters
const formatAuthor = require("./src/filters/formatAuthor.js");

// Import shortcodes
// const respImg = require("./src/shortcodes/respImg.js");
const imgShortcode = require("./src/shortcodes/imgShortcode.js");
const bookImg = require("./src/shortcodes/bookImg.js");

module.exports = function(eleventyConfig) {

  /* Shortcodes
   ======================================================================== */

  eleventyConfig.addNunjucksAsyncShortcode("image", imgShortcode);
  eleventyConfig.addPairedNunjucksAsyncShortcode("bookImg", bookImg);

  /* Filters
   ======================================================================== */

  /**
   * Format dates and times with Luxon
   *
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   * https://moment.github.io/luxon/#/formatting
   */
  eleventyConfig.addFilter("date", (dateObj, type) => {
    // ISO is like "2021-09-15"
    if (type === "iso") return DateTime.fromJSDate(dateObj, { zone: "UTC" }).toISODate();
    // DATE_FULL is like "September 15, 2021"
    if (type === "nice") return DateTime.fromJSDate(dateObj, { zone: "UTC" }).toLocaleString(DateTime.DATE_FULL);
    // DATETIME_FULL is like "October 14, 1983, 1:30 PM EDT"
    if (type === "niceWithTime") return DateTime.fromJSDate(dateObj, { zone: "UTC" }).toLocaleString(DateTime.DATETIME_FULL);
    // If no parameter is specified, just return unformatted date
    return dateObj;
  });

  /**
   * Parse date from Unix timestamp in seconds
   *
   * https://moment.github.io/luxon/#/parsing?id=unix-timestamps
   */
  eleventyConfig.addFilter("dateFromUnix", (dateObj, format) => {
    if (format === "date") return DateTime.fromSeconds(dateObj, { zone: "UTC" }).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    if (format === "time") return DateTime.fromSeconds(dateObj, { zone: "UTC" }).toLocaleString(DateTime.TIME_24_SIMPLE);
    // If no parameter is specified, just return unformatted date
    return dateObj;
  });

  eleventyConfig.addFilter("simpleDateToSeconds", (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: "utc" }).toSeconds();
  });

  eleventyConfig.addFilter("simpleDateFromSeconds", (dateObj) => {
    return DateTime.fromSeconds(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  /**
   * Sort by `dateCreated` field in front matter
   *
   * `date` uses `Last Modified`, in case I want to implement
   * evergreen articles in the future.
   */
  eleventyConfig.addFilter("sortByDateCreated", arr => {
    arr.sort((a, b) => (a.data.dateCreated) > (b.data.dateCreated) ? 1 : -1);
    return arr;
  });

  /**
   * Format author string
   */
  eleventyConfig.addFilter("formatAuthor", formatAuthor);

  /**
   * Return book title before colon (subtitle)
   */
  eleventyConfig.addFilter("removeSubtitle", (str) => {
    return str.split(":", 1);
  });

  /**
   * This is to parse Markdown in a CSV field
   * https://github.com/11ty/eleventy/issues/658
   */
  eleventyConfig.addFilter("markdown", (content) => {
    return markdownIt(markdownOptions).render(content);
  });

  /**
   * Pad numbers with leading zeros
   *
   * https://gist.github.com/endel/321925f6cafa25bbfbde
   */
  eleventyConfig.addFilter("padZeros", (myString, zeros) => {
    var s = String(myString);
    while (s.length < (zeros || 2)) { s = "0" + s; }
    return s;
  });

  /* Collections
   ======================================================================== */

  /**
   * Finished books
   *
   * https://11ty.rocks/eleventyjs/collections/#collections-from-custom-data
   */
  eleventyConfig.addCollection("booksFinished", (collection) => {
    const myBooks = collection.getAll()[0].data.books;
    // Include only books with a finish date
    const myBooksFiltered = myBooks.filter((d) => (d.finish.length > 0) && (d.finish != "Reading") && (d.finish != "Shelved") && (d.finish != "0"));
    // Sort books by finish date
    return myBooksFiltered.sort((a, b) => (b.finish) > (a.finish) ? 1 : -1);
  });

  /**
   * Books in progress
   */
  eleventyConfig.addCollection("booksReading", (collection) => {
    const myBooks = collection.getAll()[0].data.books;
    // Include only books currently marked "Reading"
    const myBooksFiltered = myBooks.filter((d) => (d.finish == "Reading"));
    // Sort books by start date
    return myBooksFiltered.sort((a, b) => (b.start) > (a.start) ? 1 : -1);
  });

  /**
   * Tags collection
   *
   * Enable us to iterate over all the tags, excluding some
   * https://github.com/kohrongying/11ty-blog-starter/blob/master/.eleventy.js
   */
  eleventyConfig.addCollection("tagList", collection => {
    const tagsSet = new Set()
    // Loop through everything
    collection.getAll().forEach(item => {
      // Don't include items without tags
      if (!item.data.tags) return
      item.data.tags
        // Don't include items with these tags...
        .filter(tag => !["posts"].includes(tag))
        // ...or with empty tags
        .filter(tag => !tag.length < 1)
        // Now add the filtered tags to the set
        .forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort();
  });

  /* Markdown
   ======================================================================== */

  /**
   * Markdown template processing
   *
   * https://www.11ty.dev/docs/languages/markdown/
   * https://github.com/markdown-it/markdown-it#init-with-presets-and-options
   */
  eleventyConfig.setLibrary("md", markdownIt(markdownOptions)
  .use(markdownItAnchor, {
    "level": [2, 3]
  }));

  /* Plugins
   ======================================================================== */

  eleventyConfig.addPlugin(syntaxHighlight);

  /* Other options
   ======================================================================== */

  /**
   * Layout aliases
   *
   * https://www.11ty.dev/docs/layouts/
   */
  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("article", "layouts/article.njk");
  eleventyConfig.addLayoutAlias("now", "layouts/now.njk");

  /**
   * Merge all tags
   *
   * https://www.11ty.dev/docs/data-deep-merge/
   */
  eleventyConfig.setDataDeepMerge(true);

  /**
   * Add YAML as custom data file format
   *
   * https://www.11ty.dev/docs/data-custom/
   */
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  /**
   * Add CSV as custom data file format
   *
   * https://maxkoehler.com/posts/eleventy-csv/
   */
  const csvParse = require("csv-parse/lib/sync");
  eleventyConfig.addDataExtension("csv", (contents) => {
    console.log("Parsing CSV...");
    const records = csvParse(contents, {
      columns: true,
      skip_empty_lines: true,
    });
    return records;
  });

  /**
   * Additional folders to copy to output folder
   *
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  // If you leave this out, you won't have original copied over.
  // eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/js");

  /**
   * Config
   *
   * https://www.11ty.dev/docs/config/
   */
  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src"
    }
  };

};
