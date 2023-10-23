import axios from 'axios';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

export const getJudgeDetails = async (
  userId: string
): Promise<JudgeDetails> => {
  try {
    const response = await axios.get(`${HIBISCUS_PODIUM_API_URL}/judges/${userId}`);

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
