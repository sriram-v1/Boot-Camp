// traverse.js
const fs = require('fs');
const path = require('path');

// Recursive function to traverse directories
function traverseDirectory(dirPath) {
    // Read all items in the directory
    fs.readdirSync(dirPath).forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            console.log(`📁 Directory: ${fullPath}`);
            // Recursively traverse the subdirectory
            traverseDirectory(fullPath);
        } else {
            console.log(`📄 File: ${fullPath}`);
        }
    });
}

// Starting point
const startDir = process.argv[2] || __dirname;
console.log(`Traversing directory: ${startDir}`);
traverseDirectory(startDir);
