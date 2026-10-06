import fs from 'fs';
import Logger from './Logger';

async function globalSetup() {
  Logger.info(
    'Hamleys automation execution started'
  );

  const directories = [
    'screenshots',
    'logs'
  ];

  for (const directory of directories) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  }

  Logger.info(
    'Required directories verified'
  );
}

export default globalSetup;