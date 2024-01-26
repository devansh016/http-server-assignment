const fs = require('fs');
const path = require('path');

const fileSizeInBytes = 100 * 1024 * 1024;
const lineLength = 80; 
const numberOfFile = 35;

const generateRandomLine = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  let line = '';
  for (let i = 0; i < lineLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    line += characters.charAt(randomIndex);
  }
  return line + '\n';
};

const generateTextFile = (filePath) => {
  const lines = [];
  let fileSize = 0;

  while (fileSize < fileSizeInBytes) {
    const line = generateRandomLine();
    lines.push(line);
    fileSize += Buffer.from(line).length;
  }

  fs.writeFileSync(filePath, lines.join(''));

  console.log(`File generated successfully at: ${filePath}`);
};

if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
  fs.mkdirSync((path.join(__dirname, 'tmp')))
}
if (!fs.existsSync(path.join(__dirname, 'tmp/data'))) {
  fs.mkdirSync((path.join(__dirname, 'tmp/data')))
}

for (let i = 1; i <= numberOfFile; i++) {
    const filePath = path.join(__dirname, `./tmp/data/${i}.txt`);
    generateTextFile(filePath);
}