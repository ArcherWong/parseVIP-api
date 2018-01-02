const http = require('http');
const cheerio = require('cheerio');
const url = 'http://51.ruyo.net/3127.html';

function getUrlList(html) {
  const $ = cheerio.load(html);

  let urlString = $('#1').next().text();

  let urlList = urlString.split('\n');

  return urlList
}

function crawderDate(callback) {
  http.get(url, res => {
    let html = '';

    res.on('data', data => {
      html += data;
    });

    res.on('end', () => {
      let result = getUrlList(html);
      callback(result);
    });

  }).on('error', () => {
    console.log('出错！');
  });
}

const port = process.env.PORT || 3000;

http.createServer((request, response) => {
  crawderDate(data => {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(data));
    response.end();
  });
}).listen(port);

console.log(`Server running on port ${port}.`);