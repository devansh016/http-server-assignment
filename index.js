const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const port = 8080;

app.get("/", function (req, res) {
    let { n, m } = req.query; 
    if (!n) {
        return res.status(400).send('Parameter "n" is required.');
    }

    let filePath = path.join(__dirname, `./tmp/data/${n}.txt`);

    try {
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        if (m) {
            let lineNumber = 0;
            fileStream.on('data', (chunk) => {
                const lines = chunk.split('\n');
                lineNumber += lines.length - 1;

                if (lineNumber >= m) {
                    fileStream.close();
                    return res.send(lines[m - 1]);
                }
            });

            fileStream.on('end', () => {
                if (lineNumber < m) {
                    return res.status(400).send('Line number is out of range.');
                }
            });
        } else {
            let fileData = '';
            fileStream.on('data', (chunk) => {
                fileData += chunk;
            });

            fileStream.on('end', () => {
                return res.send(fileData);
            });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(404).send(`File not found: ${filePath}`);
    }
});

app.listen(port, function () {
  console.log("App is running at port " + port);
});
