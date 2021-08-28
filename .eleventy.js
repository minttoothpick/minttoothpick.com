const { DateTime } = require("luxon");
const dotenv = require("dotenv").config();
const path = require("path");
const Image = require("@11ty/eleventy-img");

/**
 * https://alexpeterhall.com/blog/2021/04/05/responsive-images-eleventy/
 * Then added a wrapping `figure` element and whatever else.
 */
async function imgShortcode(figClass="", src, alt, figcaption="", sizes="(min-width: 729px) 680px, calc(100vw - 48px)") {
  var widths = [];
  // sizes is already defaulted in func param;
  if (figClass == "align-full-bleed") {
    sizes = "(min-width: 1492px) 1444px, calc(100vw - 48px)";
    widths = [600, 800, 1000, 1444, 1600, 1900, 2200, 2400];
  } else {
    widths = [600, 800, 1000, 1444, 1600, 1900];
  }

  let metadata = await Image(src, {
    // Actual widths generated; `null` passes original through as well
    widths: widths,
    formats: ["jpeg", "avif"],
    // What is output in HTML `src` and `srcset`
    urlPath: "/images/",
    // Where the generated files go
    outputDir: "./_site/images/",
    // Use original filename instead of hash
    filenameFormat: function(id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
    sharpJpegOptions: {
      quality: 80
    }
  });

  let imageAttributes = {
    // class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  let figureStrOpen = "<figure";
  // If the `figClass` parameter isn't empty, add it to `figure` code
  if (figClass.length > 0) {
    figureStrOpen = `${figureStrOpen} class="${figClass}">`;
  } else {
    figureStrOpen = `${figureStrOpen}>`;
  }

  // TODO: Yeah, limited to one paragraph... not ideal? Or fine?
  if (figcaption.length > 0) {
    figcaption = `<figcaption><p>${figcaption}</p></figcaption>`;
  }

  // TODO: probably a more template-y way to refactor, using just `figureString` w/ `myImg` injected in the middle?

  // console.log(Image.generateHTML(metadata, imageAttributes));

  let myImg = Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });

  // Switch statements to choose sizes, based on the class?

  return `${figureStrOpen}${myImg}${figcaption}</figure>`;
}

module.exports = function(eleventyConfig) {

  /* Shortcodes
   ======================================================================== */

  eleventyConfig.addNunjucksAsyncShortcode("image", imgShortcode);

  /* Filters
   ======================================================================== */

  /**
   * Format Dates and Times with Luxon
   *
   * https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
   * https://moment.github.io/luxon/#/formatting?id=table-of-tokens
   */
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLLL d, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("simpleDateToSeconds", (dateObj) => {
    // return DateTime.fromISO(dateObj, { zone: "utc" }).toFormat("s");
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
  eleventyConfig.addFilter("formatAuthor", (string) => {
    var newString = "";
    let arr = string.split(";");
    arr.forEach((item, index, arr) => {
      // If there's only one author, do nothing
      if (arr.length === 1) {
        return newString = item;
      }
      // If this is last item, do nothing
      if (index === arr.length - 1) {
        newString += item;
      // If this is penultimate item and there are only two, don't add comma
      } else if (index === arr.length - 2 && arr.length === 2) {
        newString += item + " and ";
      // If this is penultimate item, add "and"
      } else if (index === arr.length - 2 && arr.length > 2) {
        newString += item + ", and ";
      // Otherwise, add a comma
      } else {
        newString += item + ", ";
      }
    });
    return newString;
  });

  /**
   * This is... I forget... I think for Google Sheets MD content?
   * https://github.com/11ty/eleventy/issues/658
   */
  const md = require("markdown-it")({
    html: true
  });
  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
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
  eleventyConfig.addCollection("booksRead", (collection) => {
    const myBooks = collection.getAll()[0].data.books.items;
    // Include only books with a finish date
    // const myBooksFiltered = myBooks.filter((d) => (((d.gsx$finish.$t).length > 0) && (d.gsx$finish.$t) != "Reading") && ((d.gsx$finish.$t) != "Shelved"));
    const myBooksFiltered = myBooks.filter((d) => ((d.c[7]) && ((d.c[7].f).length > 0) && ((d.c[7].f).length > 0) && (d.c[7].f) != "Reading") && ((d.c[7].f) != "Shelved") && ((d.c[7].f) != "0"));
    // Sort books by date finished
    // return myBooksFiltered.sort((a, b) => (b.gsx$finish.$t) > (a.gsx$finish.$t) ? 1 : -1);
    return myBooksFiltered.sort((a, b) => (b.c[7].f) > (a.c[7].f) ? 1 : -1);
  });

  /**
   * Books in progress
   */
  eleventyConfig.addCollection("booksReading", (collection) => {
    const myBooks = collection.getAll()[0].data.books.items;
    // Include only books currently marked "Reading"
    // const myBooksFiltered = myBooks.filter((d) => (d.gsx$finish.$t) == "Reading");
    // (changed to "0" in next col over w/ new API)
    const myBooksFiltered = myBooks.filter((d) => ((d.c[8]) && ((d.c[8].f)) == "0"));
    // Sort books by date started
    // return myBooksFiltered.sort((a, b) => (b.gsx$start.$t) > (a.gsx$start.$t) ? 1 : -1);
    return myBooksFiltered.sort((a, b) => (b.c[6].f) > (a.c[6].f) ? 1 : -1);
  });

  /* Markdown
   ======================================================================== */

  /**
   * Markdown template processing
   *
   * https://www.11ty.dev/docs/languages/markdown/
   * https://github.com/markdown-it/markdown-it#init-with-presets-and-options
   */
  const markdownIt = require("markdown-it");
  const markdownItReplaceLink = require("markdown-it-replace-link");
  const markdownItAnchor = require("markdown-it-anchor");
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
  const markdownLib = markdownIt(markdownItOptions).use(markdownItReplaceLink).use(markdownItAnchor);
  eleventyConfig.setLibrary("md", markdownLib);

  /* Other options
   ======================================================================== */

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
  const yaml = require("js-yaml");
  eleventyConfig.addDataExtension("yaml", contents => yaml.load(contents));

  /**
   * Additional folders to copy to output folder
   *
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  // If you leave this out, you won't have original copied over.
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/js");

  /**
   * Override default input/output directories
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
