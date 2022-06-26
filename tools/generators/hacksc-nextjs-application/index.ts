import { Tree, installPackagesTask, readJson } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next';
import { GeneratorOptions } from './schema';
import { HackSCGeneratorScripts } from '../../../libs/generator-scripts/src';

export default async function (tree: Tree, schema: GeneratorOptions) {
  await applicationGenerator(tree, {
    name: schema.name,
    style: schema.style,
  });

  // setup husky for our project
  HackSCGeneratorScripts.configureHuskyHooksForProject(tree, schema.name);

  // read our platform tokens
  const platformTokens = readJson(tree, './tools/keys/platform-credentials.json');

  const githubRepositoryName = 'hacksc-platforms';

  const vercelProjectName = schema.name;
  // create a Vercel project linked to the monorepo
  await HackSCGeneratorScripts.createHackSCVercelProject(
    platformTokens.BOT_VERCEL_API_TOKEN,
    vercelProjectName,
    githubRepositoryName
  );

  return () => {
    installPackagesTask(tree);
  };
}
