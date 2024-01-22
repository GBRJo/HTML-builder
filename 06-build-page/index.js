const fs = require('fs').promises;
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const pathStyles = path.join(__dirname, 'styles');
const pathProjectDist = path.join(__dirname, 'project-dist', 'style.css');
const distPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(distPath, 'assets');
const indexPath = path.join(distPath, 'index.html');
const readFolder = path.join(__dirname, 'assets');

// Создаем папку project-dist
fs.mkdir(distPath, { recursive: true })
  .then(() => {
    console.log('Folder created successfully at: ' + distPath);

    // Копируем файл html
    fs.readFile(templatePath, 'utf8')
      .then((data) => {
        let htmlFile = data;

        // Заменяем пропущенный код по тегам
        fs.readdir(componentsPath, { withFileTypes: true })
          .then((files) => {
            let fileCount = 0;
            for (const file of files) {
              if (file.isFile()) {
                const fullName = file.name;
                const name = fullName.slice(0, fullName.lastIndexOf('.'));
                const fileWay = path.join(componentsPath, fullName);
                fs.readFile(fileWay, 'utf8')
                  .then((componentContent) => {
                    const tag = `{{${name}}}`;
                    htmlFile = htmlFile.replace(tag, componentContent);
                    fileCount++;
                    if (fileCount === files.length) {
                      fs.writeFile(indexPath, htmlFile, 'utf8')
                        .then(() => {
                          console.log(
                            'Tags changed successfully at: ' + indexPath,
                          );
                        })
                        .catch((error) => {
                          console.log('Something went wrong: ' + error);
                        });
                    }
                  })
                  .catch((error) => {
                    console.log('Something went wrong: ' + error);
                  });
              }
            }
          })
          .catch((error) => {
            console.log('Something went wrong: ' + error);
          });
      })
      .catch((error) => {
        console.log('Something went wrong: ' + error);
      });
    // Компилируем стили из stylesпапки в один файл и помещаем его в project-dist/style.css.
    fs.readdir(pathStyles, { withFileTypes: true })
      .then((files) => {
        for (let i = 0; i < files.length; i++) {
          if (files[i].isFile()) {
            const fileName = files[i].name;
            const ext = path.extname(fileName);
            const filePath = path.join(pathStyles, fileName);
            if (ext === '.css') {
              fs.readFile(filePath, 'utf8')
                .then((data) => {
                  const cssContent = data;
                  fs.appendFile(pathProjectDist, cssContent)
                    .then(() => {
                      console.log('Successfully wrote to ' + pathProjectDist);
                    })
                    .catch((error) => {
                      console.log('Something went wrong: ' + error);
                    });
                })
                .catch((error) => {
                  console.log('Something went wrong: ' + error);
                });
            }
          }
        }
      })
      .catch((error) => {
        console.log('Something went wrong: ' + error);
      });
    // Копируем assets папку в project-dist/assets
    fs.mkdir(assetsPath, { recursive: true })
      .then(() => {
        console.log('Folder created successfully at: ' + assetsPath);

        fs.readdir(readFolder)
          .then((files) => {
            console.log('Folder read successfully at: ' + readFolder);

            files
              .forEach((file) => {
                const filePath = path.join(readFolder, file);
                const assetsFilePath = path.join(assetsPath, file);
                fs.mkdir(assetsFilePath, { recursive: true }).then(() => {
                  console.log(
                    'Folder created successfully at: ' + assetsFilePath,
                  );

                  fs.readdir(filePath, 'utf8')
                    .then((subFiles) => {
                      subFiles.forEach((subFile) => {
                        const fileFrom = path.join(filePath, subFile);
                        const fileTo = path.join(assetsFilePath, subFile);

                        fs.copyFile(fileFrom, fileTo)
                          .then(() => {
                            console.log('File copied successfully: ' + subFile);
                          })
                          .catch((error) => {
                            console.log('Something went wrong: ' + error);
                          });
                      });
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
