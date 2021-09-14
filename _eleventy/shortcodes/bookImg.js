const Image = require("@11ty/eleventy-img");
const path = require("path");

/* Thanks: https://www.youtube.com/watch?v=nUlB8SR039w */
module.exports = async function (content, options = {}) {
  const { src = "", alt="", sizes="" } = options;

  let metadata = await Image(src, {
    widths: [200, 400, 600],
    formats: ["png", "avif"],
    // What is output in HTML `src` and `srcset`
    urlPath: "/images/books/",
    // Where the generated files go
    outputDir: "./_site/images/books/",
    filenameFormat: function(id, src, width, format, options) {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    },
  });

  let imageAttributes = {
    // class: cls,
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  }

  return myImg = Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline"
  });
};
