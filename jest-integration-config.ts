import baseConfig from './jest.config';
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  ...baseConfig,
  testMatch: ['**/*.test.ts'],
};

export default config;