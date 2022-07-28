import axios, { Axios } from 'axios';

export class SendgridClient {
  private readonly axiosInstance: Axios;

  constructor(private apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendgrid.com',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
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
        list_ids: listIds,
        contacts: emails.map((email) => ({ email })),
      },
    });
    return sendGridResponse;
  }
}
