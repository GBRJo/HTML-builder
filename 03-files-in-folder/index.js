const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'secret-folder');
const files = fs.readdirSync(filePath, { withFileTypes: true });
for (let i = 0; i < files.length; i++) {
  if (files[i].isFile()) {
    const fulName = files[i].name;
    const ext = path.extname(fulName).slice(1);
    const name = fulName.slice(0, fulName.lastIndexOf('.'));
    const fileWay = path.join(__dirname, 'secret-folder', fulName);
    fs.stat(fileWay, function (err, stats) {
      if (err) {
        console.log('Something went wrong: ' + err);
      } else {
        const size = stats.size;
        const sizeKbytes = size / 1024;
        console.log(name + ' - ' + ext + ' - ' + sizeKbytes + 'kb');
      }
    });
  }
}
