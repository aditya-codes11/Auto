import { exec } from 'child_process';
import Logger from './Logger';

export function openPlaywrightReport() {
  Logger.info(
    'Opening Playwright HTML report'
  );

  exec(
    'npx playwright show-report',
    error => {
      if (error) {
        Logger.error(
          `Unable to open report: ${error.message}`
        );

        return;
      }

      Logger.info(
        'Playwright HTML report opened'
      );
    }
  );
}