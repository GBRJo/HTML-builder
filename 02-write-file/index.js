const path = require('path');
const fs = require('fs');
const readline = require('readline');

const filePath = path.join(__dirname, '02-write-file.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('(^･ｪ･^) Are you a cat?: ', function (input) {
  fs.writeFile(filePath, input + '\n', function (error) {
    if (error) {
      console.log('(=^‥^)/ Somesign went wrong: ' + error);
    } else {
      console.log('(^-ｪ-^) I have saved your response');
    }
    secondQuestion();
    process.on('exit', function () {
      console.log('\nฅ(^･ｪ･^) Bye! It is better for you to be a cat.');
    });
  });
});

function secondQuestion() {
  rl.question('(^･ｪ･^) Are you sure?: ', function (input) {
    fs.appendFile(filePath, input + '\n', function (error) {
      if (error) {
        console.log('(=^‥^)/ Somesign went wrong: ' + error);
      } else {
        console.log('(^-ｪ-^) I have saved your response');
      }
      secondQuestion();
    });
  });
}
