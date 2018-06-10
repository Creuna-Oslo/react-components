/* eslint-env node */
/* eslint-disable no-console */
const chalk = require('chalk');
const { copySync, ensureDirSync } = require('fs-extra');
const fs = require('fs');
const getConfig = require('./get-config');
const path = require('path');
const selectComponents = require('./select-components');

module.exports = async function() {
  const { componentsPath } = await getConfig();

  ensureDirSync(componentsPath);

  selectComponents(selectedComponents => {
    selectedComponents.forEach(componentName => {
      const sourcePath = path.join(__dirname, 'components', componentName);
      const destinationPath = path.join(componentsPath, componentName);

      if (fs.existsSync(destinationPath)) {
        console.log(
          `☠️  ${componentName} ${chalk.redBright('already exists. Skipping.')}`
        );
        return;
      }

      copySync(sourcePath, destinationPath);
      console.log(`🎉  ${chalk.blueBright(componentName)} added!`);
    });

    process.exit(0);
  });
};
