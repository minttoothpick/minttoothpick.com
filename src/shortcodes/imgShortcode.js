const Image = require("@11ty/eleventy-img");
const path = require("path");

/**
 * https://alexpeterhall.com/blog/2021/04/05/responsive-images-eleventy/
 * Then added a wrapping `figure` element and whatever else.
 */
module.exports = async function imgShortcode(figClass="", src, alt, figcaption="", sizes="", style="") {
  var widths = [];
  if (figClass == "align-full-bleed") {
    /**
     * align-full-bleed:
     *  - 100vw
     *  - (min-width: 1376px) 1376px
     */
    sizes = "(min-width: 1376px) 1376px, 100vw";
    widths = [500, 800, 1100, 1344, 1920];
  } else {
    /**
     * align-none:
     *  - calc(100vw - 96px [padding inline])
     *  - (min-width: 702px) 640px
     */
    sizes = "(min-width: 702px) 640px, calc(100vw - 96px)"
    widths = [500, 640, 1280];
  }

  if (!figClass) figClass = "align-none";

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
      quality: 70
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
    figureStrOpen = `${figureStrOpen} class="${figClass}"`;
  } else {
    figureStrOpen = `${figureStrOpen}`;
  }

  // TODO: This style 'injection' is sloppy.
  if (style.length > 0) {
    figureStrOpen = `${figureStrOpen} style="${style}">`;
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
};
