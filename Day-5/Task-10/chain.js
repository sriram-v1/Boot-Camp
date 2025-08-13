const fs = require('fs').promises;
const path = require('path');

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
    console.error('Usage: node script.js <input-file> <output-file>');
    process.exit(1);
}

fs.readFile(inputFile, 'utf8')
    .then((data) => {
        console.log(`File '${inputFile}' read successfully. Processing content...`);
        const processedData = data.toUpperCase();
        return fs.writeFile(outputFile, processedData, 'utf8');
    })
    .then(() => {
        console.log(`Processed content written to '${outputFile}'.`);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });