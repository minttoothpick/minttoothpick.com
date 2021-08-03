const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  let json = await Cache(`https://spreadsheets.google.com/feeds/list/${process.env.GOOGLE_SHEETS_ID}/1/public/values?alt=json`, {
    duration: "1d",
    type: "json"
  });
  return {
    items: json.feed.entry
  };
  // let url = `https://spreadsheets.google.com/feeds/list/${process.env.GOOGLE_SHEETS_ID}/1/public/values?alt=json`;
  // console.log("Fetching from Google Sheets...");
  // return await fetch(url)
  //   .then(res => res.json()) // node-fetch option to transform to json
  //   .then(json => {
  //     return {
  //       items: json.feed.entry
  //     };
  //   });
};
