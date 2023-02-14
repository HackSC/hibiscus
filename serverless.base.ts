import type { Serverless } from 'serverless/aws';

console.log(`-------------- USING ENV: dev ----------------`);

export const baseServerlessConfigProvider: Serverless['provider'] = {
  name: 'aws',
  runtime: 'nodejs16.x',
  memorySize: 128,
  profile: 'local',
  stage: 'dev',
  region: 'us-west-1',
};

export const baseServerlessConfig: Partial<Serverless> = {
  frameworkVersion: '3',
  service: 'base',
  package: {
    individually: true,
    excludeDevDependencies: true,
  },
  plugins: ['serverless-esbuild', 'serverless-offline'],
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      target: ['es2020'],
      sourcemap: true,
      sourcesContent: false,
      plugins: '../../plugins.js',
      define: { 'require.resolve': undefined },
    },
  },
  provider: {
    ...baseServerlessConfigProvider,
    apiGateway: {
      minimumCompressionSize: 1024,
      // @ts-ignore
      restApiId: {
        'Fn::ImportValue': `dev-AppApiGW-restApiId`,
      },
      // @ts-ignore
      restApiRootResourceId: {
        'Fn::ImportValue': `dev-AppApiGW-rootResourceId`,
      },
    },
  },
};
