const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathProjectDist = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(pathStyles, { withFileTypes: true }, function (error, files) {
  if (error) {
    console.log('Something went wrong: ' + error);
  } else {
    for (let i = 0; i < files.length; i++) {
      if (files[i].isFile()) {
        const fileName = files[i].name;
        const ext = path.extname(fileName);
        const filePath = path.join(pathStyles, fileName);
        if (ext === '.css') {
          fs.readFile(filePath, 'utf8', function (error, data) {
            if (error) {
              console.log('Something went wrong: ' + error);
            } else {
              const cssContent = data;
              fs.appendFile(pathProjectDist, cssContent, function (error) {
                if (error) {
                  console.log('Something went wrong: ' + error);
                } else {
                  console.log('Successfully wrote to ' + pathProjectDist);
                }
              });
            }
          });
        }
      }
    }
  }
});
