import { ConfigAPI, TransformOptions } from '@babel/core';

const definePreset = <Options extends unknown>(
  configFn: (api: ConfigAPI, options: Options) => TransformOptions,
) => configFn;

interface Options {
  react?: 'classic' | 'automatic';
  target: 'browser' | 'server';
}

module.exports = definePreset<Options>((_api, { react, target }) => ({
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      { targets: target === 'browser' ? '> 1%' : { node: 'current' } },
    ],
    ...[
      react
        ? [
            '@babel/react',
            { runtime: react === 'automatic' ? 'automatic' : 'classic' },
          ]
        : [],
    ],
  ],
  plugins: [
    ['@babel/transform-runtime', { regenerator: false, useESModules: true }],
  ],
}));
