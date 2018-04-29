/* This file is not suffixed by ".test.js" to not being run with all other test files.
* This test needs the static build of the storybook to run.
* `npm run image-snapshots` generates the static build & uses the image snapshots behavior of storyshots.
* */

import path from 'path';
import fs from 'fs';
import initStoryshots, { imageSnapshot } from '@storybook/addon-storyshots';
import { logger } from '@storybook/node-logger';
import { name, version } from '../package.json';

// Image snapshots
// We do screenshots against the static build of the storybook.
// For this test to be meaningful, you must build the static version of the storybook *before* running this test suite.
const pathToStorybookStatic = path.join(__dirname, '../../../', 'docs', 'packages', name, version, 'examples');

import storyShotConfig from '../storyshots.config';

// https://github.com/storybooks/storybook/blob/master/examples/official-storybook/package.json
if (!fs.existsSync(pathToStorybookStatic)) {
  logger.error(
    'You are running image snapshots without having the static build of storybook. Please run "npm run storybook:build" before running tests.'
  );
} else {
  const getScreenshotOptions = ({ context, url }) => {
    return {
      fullPage: true // Do not take the full page screenshot. Default is 'true' in Storyshots.
    };
  };

  initStoryshots({
    ...storyShotConfig,
    suite: 'Image storyshots',
    test: imageSnapshot({
      storybookUrl: `file://${pathToStorybookStatic}`,
      getScreenshotOptions,
      getMatchOptions: () => ({
        failureThreshold: 0.02, // 2% threshold,
        failureThresholdType: 'percent'
      })
    })
  });
}
