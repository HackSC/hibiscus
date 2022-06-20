import axios from 'axios';
import {
  Tree,
  updateProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit';

export class HackSCGeneratorScripts {
  /**
   * Creates a new Github repository under our `HackSC` Github org
   * @param token an org member's PAT (this includes the `hacksc-engineering-bot`)
   * @param name repository name
   * @param description small description
   * @returns
   */
  static createHackSCGithubRepository(
    token: string,
    name: string,
    description?: string
  ): Promise<void> {
    return axios.post(
      'https://api.github.com/orgs/hacksc/repos',
      {
        name: name,
        description: description,
        private: true,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
      },
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${token}`,
        },
      }
    );
  }

  /**
   * Creates a new Vercel project under the `HackSC` Vercel team, hooking it up with the Github repository under `githubRepositoryName`
   * @param token the Vercel API's token for a HackSC's team member (this includes the bot under engineering@hacksc.com)
   * @param projectName the Vercel project's name
   * @param githubRepositoryName the Github repository name under our `HackSC/*` Github org to deploy-link this Vercel project with
   */
  static createHackSCVercelProject(
    token: string,
    projectName: string,
    githubRepositoryName: string
  ): Promise<void> {
    return;
  }

  /**
   * Adds the project as a Git submodule to the main `hacksc-platforms` monorepo
   * @param projectName the app/project name relative to our monorepo
   * @param githubSSHRepositoryURL the SSH URL for the Github repository
   */
  static addNewProjectAsMonorepoGSM(
    projectName: string,
    githubSSHRepositoryURL: string
  ): Promise<void> {
    return;
  }

  static configureHuskyHooksForProject(tree: Tree, projectName: string): Promise<void> {
    const newProjectConfigurations = readProjectConfiguration(
      tree,
      projectName
    );

    updateProjectConfiguration(tree, projectName, {
      root: newProjectConfigurations.root,
      generators: {
        ...newProjectConfigurations.generators,
      },
    });

    return;
  }
}
