const fs = require('fs').promises;
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distPath = path.join(__dirname, 'project-dist');
const indexPath = path.join(distPath, 'index.html');

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
  })
  .catch((error) => {
    console.log('Something went wrong: ' + error);
  });
