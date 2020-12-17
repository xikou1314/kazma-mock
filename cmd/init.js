/*
  初始化mock目录
 */

const fs = require('fs');
const path = require('path');
const ora = require('ora');
const util = require('../util');

function init(mockDir, dir) {
  const target = path.join(mockDir, dir);
  const source = path.resolve(__dirname, '../init/mock');
  const spinner = ora('Initializing Mock Data...').start();
  if (fs.existsSync(target)) {
    spinner.text = `Folder /${dir} existed, Please use another folder name!`;
    spinner.fail()
    return;
  }
  util.copyFolderRecursiveSync(source, target);
  spinner.text = 'Mock Data initial succeed!';
  spinner.succeed();
}

module.exports = init;