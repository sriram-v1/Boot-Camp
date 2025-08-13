const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const filename = args[1];

const filePath = path.join(__dirname, filename || '');

switch (command) {
    case 'create':
        if (!filename) {
            console.log('Please provide a filename.');
            process.exit(1);
        }
        fs.writeFile(filePath, '', (err) => {
            if (err) {
                console.error('Error creating file:', err);
            } else {
                console.log(`File '${filename}' created successfully.`);
            }
        });
        break;
    
    case 'delete':
        if (!filename) {
            console.log('Please provide a filename.');
            process.exit(1);
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log(`File '${filename}' deleted successfully.`);
            }
        });
        break;
    
    case 'list':
        fs.readdir(__dirname, (err, files) => {
            if (err) {
                console.error('Error listing files:', err);
            } else {
                console.log('Files in directory:', files.join(', '));
            }
        });
        break;
    
    default:
        console.log('Invalid command. Use create <filename>, delete <filename>, or list.');
}