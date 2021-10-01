const Image = require("@11ty/eleventy-img");
const path = require("path");

/**
 * Start with:
 * https://alexpeterhall.com/blog/2021/04/05/responsive-images-eleventy/
 * then I added a wrapping `figure` element and whatever else.
 */
 module.exports = async function respImg(figClass="", src, alt, figcaption="", sizes="(min-width: 729px) 680px, calc(100vw - 48px)", style="") {
  var widths = [];
  // sizes is already defaulted in func param;
  if (figClass == "align-full-bleed") {
    sizes = "(min-width: 1492px) 1444px, calc(100vw - 48px)";
    widths = [600, 800, 1000, 1444, 1920];
  } else {
    widths = [600, 800, 1000, 1444, 1920];
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
