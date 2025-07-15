import type { TransformOptions } from '@babel/core';
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  babel: async (options: TransformOptions) => ({
    ...options,
    presets: [
      ...(options.presets || []),
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  }),
  
};
export default config;
