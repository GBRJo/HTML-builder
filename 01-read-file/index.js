const path = require('path');
const fs = require('fs');

const joinPath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(joinPath);
readStream.on('data', function (chunk) {
  console.log(chunk.toString());
});
readStream.on('error', function (err) {
  console.log('somesign went wrong: ' + err);
});
