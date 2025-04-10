import axios from 'axios';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

export const getJudgeDetails = async (
  userId: string,
  accessToken: string
): Promise<JudgeDetails> => {
  try {
    console.log(accessToken);
    const response = await axios.get(
      `${HIBISCUS_PODIUM_API_URL}/judges/${userId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return response.data;
  } catch (error) {
    console.error('Error: ', error);
  }
};

export interface JudgeDetails {
  id: string;
  verticalId: string;
  verticalName: string;
}
