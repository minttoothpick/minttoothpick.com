const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");

/**
 * v2.1: new API endpoint, using 11ty Cache
 *
 * TODO: Dunno how to make it work. Console logs the JSON, but 11ty
 *       says it can't "read property 'items' of undefined"
 */
// module.exports = async function() {
//   let url = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:json`;

//   var text = await Cache(url, {
//     duration: "1s",
//     type: "text"
//   })
//   .then(text => {
//     var json = JSON.parse(text.substr(47).slice(0, -2));
//     console.log(json);
//     return {
//       items: json.table.rows
//     };
//   });
// };

/**
 * v2.1: new API endpoint, with Cache plugin
 *
 * https://stackoverflow.com/questions/68897803/how-can-i-cache-this-call-to-the-google-sheets-api
 */
module.exports = async function() {
  let url = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:json`;

  var text = await Cache(url, {
    duration: "1h",
    type: "text"
  });

  var json = JSON.parse(text.substr(47).slice(0, -2));
  // console.log(json);
  return {
    items: json.table.rows
  };
}

/**
 * v2.0: new API endpoint
 *
 * https://benborgers.com/posts/google-sheets-json
 */
// module.exports = async function() {
//   let url = `https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:json`;
//   console.log("Fetching from Google Sheets...");
//   return await fetch(url)
//     .then(res => res.text()) // node-fetch option to transform to json
//     .then(text => {
//       let json = JSON.parse(text.substr(47).slice(0, -2));
//       return {
//         items: json.table.rows
//       };
//     });
// }

/**
 * v1.1: old API endpoint w/ 11ty Cache
 */
// module.exports = async function() {
//   let json = await Cache(`https://spreadsheets.google.com/feeds/list/${process.env.GOOGLE_SHEETS_ID}/1/public/values?alt=json`, {
//     duration: "1d",
//     type: "json"
//   });
//   return {
//     items: json.feed.entry
//   };
// };

/**
 * v1.0: old API endpoint
 */
// module.exports = async function() {
//   let url = `https://spreadsheets.google.com/feeds/list/${process.env.GOOGLE_SHEETS_ID}/1/public/values?alt=json`;
//   console.log("Fetching from Google Sheets...");
//   return await fetch(url)
//     .then(res => res.json()) // node-fetch option to transform to json
//     .then(json => {
//       return {
//         items: json.feed.entry
//       };
//     });
// }
