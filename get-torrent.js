const axios = require("axios").default;

const urlRegex = /((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.torrent)/gi;
// url of torrent download page
const urls = ['https://mac-torrent-download.net/download/?L5KOxvdRgmpguAmZLjt4PSqKhWI%2FYPJcdDjEnOPFsDQs4dwbzmWO37jDrpGypsHfTlen9Y3PtnRcxlnAULCcPA%3D%3D%26mdz1xtr1tuLZsrjdl6MhEg%3D%3D%26id%3D3xa9v'];

Promise
    .all(urls.map(getOne))
    .then(res => {
        console.log(res)
    })

function getOne(url) {
  return axios
    .get(url)
    .then(({ data }) => {
      // console.log(data)
      return data
        .split("\n")
        .filter((line) => urlRegex.test(line))
        .map((line) => line.match(urlRegex)[0])
        .pop()
    })
    .catch((e) => {
      console.error(e);
    });
}
