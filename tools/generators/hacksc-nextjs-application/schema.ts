import { SupportedStyles } from '@nrwl/react/typings/style';

export type E2ETestRunnerOptions = 'cypress' | 'none';
export interface GeneratorOptions {
  name: string;
  style: SupportedStyles;
  e2e: E2ETestRunnerOptions;
}
