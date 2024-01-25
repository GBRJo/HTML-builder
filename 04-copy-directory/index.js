const path = require('path');
const fs = require('fs').promises;

const joinPath = path.join(__dirname, 'files-copy');
fs.mkdir(joinPath, { recursive: true })
  .then(() => {
    console.log('Folder created successfully at: ' + joinPath);

    const readFolder = path.join(__dirname, 'files');
    fs.readdir(joinPath)
      .then((copyFiles) => {
        // Получаем список файлов в папке files-copy
        fs.readdir(readFolder)
          .then((sourceFiles) => {
            console.log('Folder read successfully at: ' + readFolder);
            // Удаляем файлы, которые не существуют в папке files
            copyFiles.forEach((copyFile) => {
              if (!sourceFiles.includes(copyFile)) {
                const fileToDelete = path.join(joinPath, copyFile);
                fs.unlink(fileToDelete)
                  .then(() => {
                    console.log('File deleted successfully: ' + copyFile);
                  })
                  .catch((error) => {
                    console.log('Something went wrong: ' + error);
                  });
              }
            });

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
      })
      .catch((error) => {
        console.log('Something went wrong: ' + error);
      });
  })
  .catch((error) => {
    console.log('Something went wrong: ' + error);
  });
