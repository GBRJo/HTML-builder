const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'secret-folder');

fs.readdir(filePath, { withFileTypes: true }, function (error, files) {
  if (error) {
    console.log('Something went wrong: ' + error);
  } else {
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        const fullName = files[i].name;
        const ext = path.extname(fullName).slice(1);
        const name = fullName.slice(0, fullName.lastIndexOf('.'));
        const fileWay = path.join(filePath, fullName);
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
  }
});
