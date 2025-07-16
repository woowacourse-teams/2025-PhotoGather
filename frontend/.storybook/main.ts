import type { TransformOptions } from '@babel/core';
import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

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
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@assets': path.resolve(__dirname, '../src/@assets'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@utils': path.resolve(__dirname, '../src/utils'),
    };

    // SVG를 React 컴포넌트로 처리하는 규칙 추가
    const fileLoaderRule = config.module?.rules?.find(
      (rule) =>
        rule &&
        typeof rule === 'object' &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg'),
    );

    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgo: true,
            titleProp: true,
            ref: true,
            exportType: 'named',
          },
        },
        'file-loader',
      ],
    });

    return config;
  },
};
export default config;
