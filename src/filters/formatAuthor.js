/**
 * Format author string
 */
module.exports = function formatAuthor(string) {
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
};
