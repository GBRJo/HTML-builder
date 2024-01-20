const path = require('path');
const fs = require('fs').promises;

const joinPath = path.join(__dirname, 'files-copy');
fs.mkdir(joinPath, { recursive: true })
  .then(() => {
    console.log('Folder created successfully at: ' + joinPath);

    const readFolder = path.join(__dirname, 'files');
    fs.readdir(readFolder)
      .then((files) => {
        console.log('Folder read successfully at: ' + readFolder);
        files.forEach((file) => {
          const fileFrom = path.join(readFolder, file);
          const fileTo = path.join(joinPath, file);
          fs.copyFile(fileFrom, fileTo)
            .then(() => {
              console.log('File copied successfully: ' + file);
            })
            .catch((error) => {
              console.log('Something went wrong: ' + error);
            });
        });
      })
      .catch((error) => {
        console.log('Something went wrong: ' + error);
      });
  })
  .catch((error) => {
    console.log('Something went wrong: ' + error);
  });
