import { Tree, installPackagesTask, readJson } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next';
import { GeneratorOptions } from './schema';
import { HackSCGeneratorScripts } from '../../../libs/generator-scripts/src';

export default async function (tree: Tree, schema: GeneratorOptions) {
  await applicationGenerator(tree, {
    name: schema.name,
    style: schema.style,
  });

  HackSCGeneratorScripts.configureHuskyHooksForProject(tree, schema.name);

  // read our platform tokens
  const platformTokens = readJson(tree, './platform-credentials.json');

  const githubRepositoryName = schema.name;
  await HackSCGeneratorScripts.createHackSCGithubRepository(
    platformTokens.BOT_GITHUB_PAT,
    githubRepositoryName
  );

  const vercelProjectName = schema.name;
  await HackSCGeneratorScripts.createHackSCVercelProject(
    platformTokens.BOT_VERCEL_API_TOKEN,
    vercelProjectName,
    githubRepositoryName
  );

  return () => {
    installPackagesTask(tree);
  };
}
