import axios from 'axios';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

export const updateProjectRanking = async (
  projectId: string,
  verticalId: string,
  userId: string,
  rank: number,
  accessToken: string
): Promise<boolean> => {
  try {
    await axios.post(
      `${HIBISCUS_PODIUM_API_URL}/ranking/${verticalId}/${userId}`,
      {
        projectId,
        newRanking: rank,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return true;
  } catch (error) {
    console.error('Error: ', error);
    return false;
  }
};
