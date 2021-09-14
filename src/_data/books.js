const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");
const fs = require("fs");
const csvParse = require("csv-parse/lib/sync");

/**
 * v3: new API endpoint, using Cache plugin, returning CSV
 */
module.exports = async function() {
  let url = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:csv`;

  var text = await Cache(url, {
    duration: "1h",
    type: "text"
  });

  const records = csvParse(text, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
}
