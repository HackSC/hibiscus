import { installPackagesTask, readJson, Tree } from '@nrwl/devkit';
import { applicationGenerator } from '@nrwl/next';
import { GeneratorOptions } from './schema';
import { VercelAPIClient } from './vercel.client';

export default async function (tree: Tree, schema: GeneratorOptions) {
  // read our platform tokens
  const platformTokens = readJson(
    tree,
    './tools/keys/platform-credentials.json'
  );

  // read metadata json to get vercel team id
  const metadata = readJson(tree, './tools/keys/project-metadata.json');

  const generatorScriptsClient = new VercelAPIClient(
    platformTokens.BOT_VERCEL_API_TOKEN
  );

  // create a Vercel project linked to the monorepo
  const vercelProjectName = schema.name;
  try {
    const response =
      await generatorScriptsClient.createHackSCVercelNextJSProject(
        vercelProjectName,
        metadata.HACKSC_VERCEL_TEAM_ID
      );

    console.log(
      '\x1b[36m',
      `[SUCCESS] Created project ${metadata.HACKSC_VERCEL_TEAM_NAMESPACE}/${response.data.name} at https://vercel.com/${metadata.HACKSC_VERCEL_TEAM_NAMESPACE}/${response.data.name}`
    );

    // now we create the app in local repo
    await applicationGenerator(tree, {
      name: schema.name,
      style: schema.style,
      e2eTestRunner: schema.e2e,
    });

    return () => {
      installPackagesTask(tree);
    };
  } catch (e) {
    console.error(
      '\x1b[31m',
      '[ERR] Oops, an error occured trying to create a HackSC Vercel project:',
      e.response.data
    );
  }
}
