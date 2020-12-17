/*
  添加mock文件
 */

const path = require("path");
const inquirer = require("inquirer");
const source = path.resolve(__dirname, '../init/mock');
const util = require('../util');

function add(mockDir, dir) {
  const target = path.join(mockDir, dir);
  console.log("add 启动");
  console.log(mockDir);
  console.log(target);
  inquirer
    .prompt([{
        type: "list",
        name: "type",
        message: "Select a mock template ",
        choices: [{
            name: "simple",
            value: "simple"
          },
          {
            name: "function",
            value: "function"
          },
          {
            name: "dynamic",
            value: "dynamic"
          }
        ]
      },
      {
        type: "input",
        name: "name",
        message: "please input the file name"
      }
    ])
    .then(answers => {
      switch (answers.type) {
        case 'function':
          util.copyFileSync(source + '/b.js', `${target}/${answers.name}.js`);
          break;
        case 'dynamic':
          util.copyFileSync(source + '/c.js', `${target}/${answers.name}.js`);
          break;
        case 'simple':
        default:
          util.copyFileSync(source + '/a.js', `${target}/${answers.name}.js`);
      }

    });
}

module.exports = add;