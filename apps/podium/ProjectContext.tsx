import { createContext, useContext, useEffect, useState } from 'react';
import getProjects from './utils/getProjects';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { getJudgeDetails } from './utils/getJudgeDetails';

interface ProjectContextType {
  ranked: any[];
  unranked: any[];
  onHold: any[];
  projects: any[];
  spotlight: any[];
}

const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

export const ProjectContextProvider = (props: React.PropsWithChildren) => {
  const { user } = useHibiscusUser();

  const [rankedProjects, setRankedProjects] = useState<Project[]>([]);
  const [unrankedProjects, setUnrankedProjects] = useState<Project[]>([]);
  const [onHoldProjects, setOnHoldProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [spotlightProject, setSpotlightProject] = useState<Project>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log('calling api!!');
      if (user != null) {
        try {
          // Get judge associated vertical
          const judgeDetails = await getJudgeDetails(user.id);

          const [unrankedPromises, rankedPromises] = await getProjects(
            user.id,
            judgeDetails.verticalId
          );

          const unrankedData = await Promise.all(unrankedPromises);
          const rankedData = await Promise.all(rankedPromises);

          setUnrankedProjects(unrankedData);
          setRankedProjects(rankedData);
        } catch (error) {
          console.error('Error fetching unranked projects: ', error);
        }
      }
    };

    fetchProjects();
  }, [user]);

  useEffect(() => {
    setAllProjects(rankedProjects.concat(unrankedProjects));
    console.log('updated');
  }, [rankedProjects, unrankedProjects]);

  return (
    <ProjectContext.Provider
      value={{
        ranked: [rankedProjects, setRankedProjects],
        unranked: [unrankedProjects, setUnrankedProjects],
        onHold: [onHoldProjects, setOnHoldProjects],
        projects: [allProjects, setAllProjects],
        spotlight: [spotlightProject, setSpotlightProject],
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
