import { useState, useMemo } from 'react';
import { useProjectContext } from '../ProjectContext';
import {
  Active,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import RankProject from '../components/RankProject';
import * as styles from '../styles/index.css';
import OnHoldProject from '../components/OnHoldProject';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { updateProjectRanking } from '../utils/updateProjectRanking';

const Index = () => {
  const { ranked, unranked, onHold, projects } = useProjectContext();
  const [unrankedProjects, setUnrankedProjects] = unranked;
  const [rankedProjects, setRankedProjects] = ranked;
  const [allProjects, setAllProjects] = projects;
  const [onHoldProjects, setOnHoldProjects] = onHold;

  const { user } = useHibiscusUser();

  const allProjectIds = useMemo(
    () => allProjects.map((p) => p.projectId),
    [allProjects]
  );

  const [active, setActive] = useState<Active | null>(null);
  const activeProject = useMemo(
    () => allProjects.find((p) => p.projectId === active?.id),
    [active, allProjects]
  );

  const [isOnHoldExpanded, setIsOnHoldExpanded] = useState(false);
  const toggleOnHoldExpansion = () => {
    setIsOnHoldExpanded((prevExpanded) => !prevExpanded);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 6,
      },
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (over && over.data) {
      if (over.data.current?.type === 'Ranked') {
        switch (active.data.current?.type) {
          case 'Unranked': {
            setRankedProjects((prev) => {
              const updatedRanking = [...prev, activeProject];

              if (active.id !== over.id) {
                const newIndex = rankedProjects.findIndex(
                  ({ projectId }) => projectId === over.id
                );

                const oldIndex = prev.findIndex(
                  ({ projectId }) => projectId === active.id
                );

                updateProjectRanking(
                  activeProject.projectId,
                  activeProject.verticalId,
                  user.id,
                  newIndex + 1
                );

                return arrayMove(updatedRanking, oldIndex, newIndex);
              }
            });

            setUnrankedProjects((prev) => {
              const updatedRanking = prev.filter((p) => {
                return p.projectId !== active.id;
              });

              return updatedRanking;
            });

            break;
          }
          case 'Ranked': {
            setRankedProjects((prev) => {
              if (active.id !== over.id) {
                const newIndex = rankedProjects.findIndex(
                  ({ projectId }) => projectId === over.id
                );

                const oldIndex = prev.findIndex(
                  ({ projectId }) => projectId === active.id
                );

                updateProjectRanking(
                  activeProject.projectId,
                  activeProject.verticalId,
                  user.id,
                  newIndex + 1
                );

                return arrayMove(prev, oldIndex, newIndex);
              }
            });

            break;
          }
        }
      } else if (over.data.current?.type === 'Unranked') {
        if (!rankedProjects.length) {
          updateProjectRanking(
            activeProject.projectId,
            activeProject.verticalId,
            user.id,
            1
          );
        }
      }
    }

    setActive(null);
  };

  return (
    <>
      <header className={`${styles.header} ${styles.flexCenter}`}>
        <img src="logo_word.png" alt="Hibiscus HackSC Logo" />
      </header>
      <div className={styles.containerMain}>
        {onHoldProjects[0] ? <h1>On Hold will go here</h1> : <></>}
        <div onClick={toggleOnHoldExpansion}>
          <ul
            className={
              isOnHoldExpanded ? styles.onHoldStackExpanded : styles.onHoldStack
            }
          >
            {isOnHoldExpanded
              ? onHoldProjects.map((project) => (
                  <OnHoldProject
                    key={project.projectId}
                    project={project}
                    type={'OnHold'}
                    isExpanded={true}
                  />
                ))
              : onHoldProjects
                  .slice(0, 3)
                  .map((project) => (
                    <OnHoldProject
                      key={project.projectId}
                      project={project}
                      type={'OnHold'}
                      isExpanded={false}
                    />
                  ))}
          </ul>
        </div>
        <h1>Rank</h1> <br />
        {!allProjects[0] ? <p>Loading...</p> : <></>}
        <DndContext
          sensors={sensors}
          onDragStart={({ active }) => {
            setActive(active);
          }}
          // TODO: switch to post to api
          // and after that clean this up and put into handler function
          onDragEnd={handleDragEnd}
          onDragCancel={() => {
            setActive(null);
          }}
        >
          <SortableContext items={allProjectIds}>
            <ul>
              {rankedProjects.map((project) => (
                <RankProject
                  key={project.projectId}
                  project={project}
                  ranking={rankedProjects.findIndex(
                    (p) => p.projectId === project.projectId
                  )}
                  type={'Ranked'}
                />
              ))}
            </ul>
            <ul>
              {unrankedProjects.map((project) => (
                <RankProject
                  key={project.projectId}
                  project={project}
                  ranking={null}
                  type={'Unranked'}
                />
              ))}
            </ul>
          </SortableContext>

          <DragOverlay>
            {activeProject && (
              <RankProject
                project={activeProject}
                ranking={null}
                type={'Ranked'}
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
};

export default Index;
