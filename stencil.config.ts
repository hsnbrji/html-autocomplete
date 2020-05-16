import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'html-autocomplete',
  globalScript: './src/globals/global.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
