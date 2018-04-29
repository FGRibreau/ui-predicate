import path from 'path';
import { multiSnapshotWithOptions } from '@storybook/addon-storyshots';

export default {
  framework: 'vue',
  configPath: path.join(__dirname, '.storybook'),
  integrityOptions: { cwd: path.join(__dirname, 'src') },
  test: multiSnapshotWithOptions({}),
};
