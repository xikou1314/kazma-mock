const fs = require('fs');
const path = require('path');


function copyFileSync(source, target) {
    var targetFile = target;

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        } else {
            console.log('the file exists, please rename the file and try again!');
            process.exitCode = 1;
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFilesSync(fileArray) {
    fileArray.forEach(file => {
        copyFileSync(file.source, file.target)
    })
}


function copyFolderRecursiveSync(source, target) {
    var files = [];

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target);
    }

    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, target);
            } else {
                copyFileSync(curSource, target);
            }
        })
    }
}
module.exports = {
    copyFileSync,
    copyFolderRecursiveSync,
    copyFilesSync
}