const fetch = require("node-fetch");

module.exports = async function() {
  let url = `https://spreadsheets.google.com/feeds/list/${process.env.GOOGLE_SHEETS_ID}/1/public/values?alt=json`;
  console.log("Fetching from Google Sheets...");
  return await fetch(url)
    .then(res => res.json()) // node-fetch option to transform to json
    .then(json => {
      return {
        items: json.feed.entry
      };
    });
};
