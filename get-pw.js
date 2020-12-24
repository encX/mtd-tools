const axios = require("axios").default;
const atob = require("atob");

const nextPageRegex = /urlstrings\s?=\s?atob\('([a-z0-9=]+)'\)/i;
const passwordLineRegex = /(.+\('passwd'\).+)/gi;

// url from pdf
const url =
  "https://mac-torrent-download.net/pw.php?UVNaS3FETitCYzJMOU9iMnNPL0dTUE1JYUk0VVlBempLZzFvRGllRjEzVT0=";

getOne(url)
  .then((password) => console.log(password))
  .catch((e) => console.error(e));

function getOne(url) {
  return axios
    .get(url)
    .then(({ data }) => {
      const nextPage = data.match(nextPageRegex)[1];
      return axios.get(atob(nextPage));
    })
    .then(({ data }) => {
      const passwordLine = data.match(passwordLineRegex).pop();
      const password = passwordLine.match(/\[('.+',?)+\];/i)[1].split(',').pop().replace(/'/g, '')
      return atob(password)
    })
}
