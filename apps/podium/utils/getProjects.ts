import axios from 'axios';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

const getVerticalProjects = async (verticalId: string, accessToken: string) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_PODIUM_API_URL}/projects/${verticalId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return jsonData.projects;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getRanked = async (
  userId: string,
  verticalId: string,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_PODIUM_API_URL}/ranking/${verticalId}/${userId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return jsonData.rankings;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getProjectDetails = async (
  projectId: string,
  verticalId: string,
  accessToken: string
) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_PODIUM_API_URL}/projects/${verticalId}/${projectId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return {
      projectId: jsonData.projectId,
      verticalId: jsonData.verticalId,
      name: jsonData.name,
      teamMembers: jsonData.teamMembers,
      description: jsonData.description,
      imageUrl: jsonData.imageUrl,
      videoUrl: jsonData.videoUrl,
    };
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getProjects = async (
  userId: string,
  verticalId: string,
  accessToken: string
) => {
  let unranked = [];
  let ranked = [];

  const allProjects = await getVerticalProjects(verticalId, accessToken);
  const rankedBasic = await getRanked(userId, verticalId, accessToken);

  const rankedIds = rankedBasic.map((p) => p.projectId);
  const unrankedBasic = allProjects.filter(
    (p) => !rankedIds.includes(p.projectId)
  );

  unranked = unrankedBasic.map((p) => {
    return getProjectDetails(p.projectId, verticalId, accessToken);
  });

  ranked = rankedBasic.map((p) => {
    return getProjectDetails(p.projectId, verticalId, accessToken);
  });

  return [unranked, ranked];
};

export default getProjects;
