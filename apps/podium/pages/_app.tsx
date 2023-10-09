import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ProjectContext from '../ProjectContext';
import getProjects from '../utils/getProjects';

function App({ Component, pageProps }: AppProps) {
  const [rankedProjects, setRankedProjects] = useState<Project[]>([]);
  const [unrankedProjects, setUnrankedProjects] = useState<Project[]>([]);
  const [onHoldProjects, setOnHoldProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [spotlightProject, setSpotlightProject] = useState<Project>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log('calling api!!')
      try {
        const [unrankedPromises, rankedPromises] = await getProjects();

        const unrankedData = await Promise.all(unrankedPromises);
        const rankedData = await Promise.all(rankedPromises);

        setUnrankedProjects(unrankedData);
        setRankedProjects(rankedData);

      } catch (error) {
        console.error('Error fetching unranked projects: ', error);
      }
    }

    fetchProjects();
  }, [])

  useEffect(() => {
    setAllProjects(rankedProjects.concat(unrankedProjects));
    console.log('updated')
  }, [rankedProjects, unrankedProjects])


  return (
    <>
      <Head>
        <title>HackSC Podium</title>
      </Head>
      <main>
        <ProjectContext.Provider
          value={{
            ranked: [rankedProjects, setRankedProjects],
            unranked: [unrankedProjects, setUnrankedProjects],
            onHold: [onHoldProjects, setOnHoldProjects],
            projects: [allProjects, setAllProjects],
            spotlight: [spotlightProject, setSpotlightProject]
          }}>
          <Component {...pageProps} />
        </ProjectContext.Provider>
      </main>
    </>
  );
}

export default App;