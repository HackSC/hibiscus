import axios, { Axios } from 'axios';

const HIBISCUS_GIT_REPO_URL = 'HackSC/hibiscus';

// a class to host our clients
export class VercelAPIClient {
  private vercelToken: string;
  protected readonly vercelAPIAxiosInstance: Axios;

  constructor(vercelToken: string) {
    this.vercelToken = vercelToken;
    this.vercelAPIAxiosInstance = axios.create({
      baseURL: 'https://api.vercel.com',
      headers: {
        Authorization: `Bearer ${this.vercelToken}`,
      },
    });
  }

  /**
   * Creates a new Next.js Vercel project under the `HackSC` Vercel team
   * @param appName the Nx app under `/apps`/Vercel project name
   * @param vercelTeamId the HackSC Vercel team ID
   */
  async createHackSCVercelNextJSProject(appName: string, vercelTeamId: string) {
    return this.vercelAPIAxiosInstance.request({
      method: 'POST',
      url: `/v9/projects?teamId=${vercelTeamId}`,
      data: {
        name: appName,
        framework: 'nextjs',
        buildCommand: `npx nx run ${appName}:build --prod --no-cache`,
        gitRepository: {
          repo: HIBISCUS_GIT_REPO_URL,
          type: 'github',
        },
        outputDirectory: `dist/apps/${appName}/.next`,
        commandForIgnoringBuildStep: `bash ./tools/scripts/vercel-affected-nx-ignore.sh ${appName}`,
      },
    });
  }

  /**
   * Deletes a HackSC Vercel project via Vercel API.
   * @param projectNameOrId Vercel project name
   * @returns
   */
  async deleteHackSCProject(projectNameOrId: string) {
    return this.vercelAPIAxiosInstance.request({
      method: 'DELETE',
      url: `/v9/projects/${projectNameOrId}`,
    });
  }
}
