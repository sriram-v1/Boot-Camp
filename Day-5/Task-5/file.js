const fs = require('fs');
const path = require('path');

function getFileStats(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.log("Error: File does not exist.");
            return;
        }

        const stats = fs.statSync(filePath);
        console.log(`File: ${filePath}`);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Creation Date: ${new Date(stats.birthtime).toLocaleString()}`);
        console.log(`Last Modified Date: ${new Date(stats.mtime).toLocaleString()}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

if (process.argv.length !== 3) {
    console.log("Usage: node script.js <file_path>");
} else {
    getFileStats(process.argv[2]);
}