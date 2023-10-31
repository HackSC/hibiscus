import axios from 'axios';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

const unrankProject = async (projectId: string, verticalId: string, userId: string) => {
  try {
    await axios.delete(
      `${HIBISCUS_PODIUM_API_URL}/ranking/${verticalId}/${userId}`,
      {
        data: { projectId }
      }
    )
  } catch (error) {
    console.error('Error: ', error);
  }
};

export default unrankProject;