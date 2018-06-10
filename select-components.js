/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const componentNames = fs.readdirSync(path.join(__dirname, 'components'));

const list = require('select-shell')({
  pointer: ' ➤ ',
  pointerColor: 'black',
  checked: ' ●  ',
  unchecked: ' ○  ',
  checkedColor: 'cyan',
  uncheckedColor: 'cyan',
  msgCancel: '',
  multiSelect: true,
  prepend: true
});

componentNames.forEach(name => {
  list.option(name);
});

list.list();

module.exports = function(callback) {
  list.on('select', options => {
    callback(options.map(({ text }) => text));
  });
};

list.on('cancel', () => {
  console.log(chalk.redBright('Cancelled. Exiting.'));
  process.exit(0);
});
