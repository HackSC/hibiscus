import axios from 'axios';

// TODO: replace hardcode with vertical id
// TODO: fetch from session judge id

const HIBISCUS_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_API_URL;
const TEST_VERTICAL_ID = process.env.NEXT_PUBLIC_TEST_VERTICAL_ID;

const test = async () => {
  console.log(`${HIBISCUS_API_URL}/projects/${TEST_VERTICAL_ID}`);
  console.log(HIBISCUS_API_URL);

  try {
    const response = await axios.get(
      'https://iegz97vdvi.execute-api.us-west-1.amazonaws.com/api/projects/6744df09-1158-45cd-869d-cc5c4cedf30c'
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    console.log(jsonData);

    return jsonData.projects;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getVerticalProjects = async (verticalId: string) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_API_URL}/projects/${verticalId}`
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return jsonData.projects;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getRanked = async (userId: string, verticalId: string) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_API_URL}/ranking/${verticalId}/${userId}`
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return jsonData.rankings;
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getProjectDetails = async (projectId: string, verticalId: string) => {
  try {
    const response = await axios.get(
      `${HIBISCUS_API_URL}/projects/${verticalId}/${projectId}`
    );

    const jsonString = JSON.stringify(response.data);
    const jsonData = JSON.parse(jsonString);

    return {
      projectId: jsonData.projectId,
      name: jsonData.name,
      teamMembers: jsonData.teamMembers,
      description: jsonData.description,
      imageUrl: jsonData.imageUrl,
    };
  } catch (error) {
    console.error('Error: ', error);
  }
};

const getProjects = async (userId: string, verticalId: string) => {
  test();

  let unranked = [];
  let ranked = [];

  const allProjects = await getVerticalProjects(verticalId);
  const rankedBasic = await getRanked(userId, verticalId);

  const rankedIds = rankedBasic.map((p) => p.projectId);
  const unrankedBasic = allProjects.filter(
    (p) => !rankedIds.includes(p.projectId)
  );

  unranked = unrankedBasic.map((p) => {
    return getProjectDetails(p.projectId, verticalId);
  });

  ranked = rankedBasic.map((p) => {
    return getProjectDetails(p.projectId, verticalId);
  });

  return [unranked, ranked];
};

export default getProjects;
