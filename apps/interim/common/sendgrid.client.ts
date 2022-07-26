import { Axios } from 'axios';

export class SendgridClient {
  private readonly axiosInstance: Axios;

  constructor(private apiKey: string) {
    this.axiosInstance = new Axios({
      baseURL: 'https://api.sendgrid.com',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Save email contacts into Sendgrid lists
   *
   * @param listIds IDs of Sendgrid lists
   * @param emails list of emails
   * @returns API response from Sendgrid
   */
  async saveContactsToLists(listIds: string[], emails: string[]) {
    const sendGridResponse = await this.axiosInstance.request({
      url: '/v3/marketing/contacts',
      method: 'PUT',
      data: {
        contacts: emails.map((email) => ({ email })),
        list_ids: listIds,
      },
    });
    return sendGridResponse;
  }
}
