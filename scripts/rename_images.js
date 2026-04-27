const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '../public/images/properties/homeland-regalia');
const files = fs.readdirSync(dirPath);

files.forEach(file => {
    if (file.includes(' ')) {
        const oldPath = path.join(dirPath, file);
        const newName = file.replace(/\s+/g, '-').toLowerCase();
        const newPath = path.join(dirPath, newName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${newName}`);
    }
});
