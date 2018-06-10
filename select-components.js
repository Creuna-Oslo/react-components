/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

module.exports = function() {
  // Has to be required when called, or else 'shell-select' will initialize early and make everything behave weirdly
  const list = require('select-shell')({
    pointer: ' ➤ ',
    pointerColor: 'black',
    checked: '● ',
    unchecked: '○ ',
    checkedColor: 'cyan',
    uncheckedColor: 'cyan',
    msgCancel: '',
    multiSelect: true,
    prepend: true
  });

  return new Promise(resolve => {
    const componentNames = fs.readdirSync(path.join(__dirname, 'components'));

    console.log(chalk.bold('Select components'));
    console.log(chalk.dim('spacebar to select, ESC to abort\n'));

    componentNames.forEach(name => {
      list.option(name);
    });

    list.list();

    list.on('select', options => {
      resolve(options.map(({ text }) => text));
    });

    list.on('cancel', () => {
      console.log(chalk.redBright('Cancelled. Exiting.'));
      process.exit(0);
    });
  });
};
