import { useEffect, useMemo, useState } from 'react';
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SlideroomSpotlight from '../components/SlideroomSpotlight';
import SlideroomOnHold from '../components/SlideroomOnHold';
import SlideroomRankProject from '../components/SlideroomRankProject';
import { useProjectContext } from '../ProjectContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import * as styles from '../styles/index.css';
import { FC } from 'react';
import DragOverlaySlide from '../components/DragOverlaySlide';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { updateProjectRanking } from '../utils/updateProjectRanking';
import { Project } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface slideroomProps {}

const Slideroom: FC<slideroomProps> = () => {
  const { ranked, unranked, onHold, projects, spotlight } = useProjectContext();
  const [unrankedProjects, setUnrankedProjects] = unranked;
  const [rankedProjects, setRankedProjects] = ranked;
  const [allProjects, setAllProjects] = projects;
  const [onHoldProjects, setOnHoldProjects] = onHold;
  const [spotlightProject, setSpotlightProject] = spotlight;
  const [isLoading, setIsLoading] = useState(true);

  // const [localSpotlightProject, setLocalSpotlightProject] =
  //   useState<Project>(null);
  const [localRankedProjects, setLocalRankedProjects] =
    useState<Project[]>(null);
  const [localUnrankedProjects, setLocalUnrankedProjects] =
    useState<Project[]>(null);

  // useEffect(() => {
  //   setLocalSpotlightProject(spotlightProject);
  // }, [spotlightProject]);

  useEffect(() => {
    setLocalRankedProjects(rankedProjects);
  }, [rankedProjects]);

  useEffect(() => {
    setLocalUnrankedProjects(unrankedProjects);
  }, [unrankedProjects]);

  const { user } = useHibiscusUser();

  const { setNodeRef } = useDroppable({ id: 'slideroom-project-bar' });

  const allProjectIds = useMemo(() => {
    if (localRankedProjects && localUnrankedProjects) {
      return [...localRankedProjects, ...localUnrankedProjects]
        .map((p) => p?.projectId)
        .filter((p) => p != null);
    } else {
      return [];
    }
  }, [localRankedProjects, localUnrankedProjects]);

  useEffect(() => {
    if (rankedProjects && unrankedProjects && spotlightProject) {
      // Remove active project from list of ranked/unranked projects
      const rankedIndex = rankedProjects.findIndex(
        ({ projectId }) => projectId === spotlightProject.projectId
      );

      if (rankedIndex >= 0) {
        // Spotlight project is ranked
        setLocalRankedProjects([
          ...rankedProjects.slice(0, rankedIndex),
          ...rankedProjects.slice(rankedIndex + 1),
        ]);
      } else {
        setLocalRankedProjects(rankedProjects);
      }

      const unrankedIndex = unrankedProjects.findIndex(
        ({ projectId }) => projectId === spotlightProject.projectId
      );
      if (unrankedIndex >= 0) {
        // Active project is unranked
        setLocalUnrankedProjects([
          ...unrankedProjects.slice(0, unrankedIndex),
          ...unrankedProjects.slice(unrankedIndex + 1),
        ]);
      } else {
        setLocalUnrankedProjects(unrankedProjects);
      }
    }
  }, [spotlightProject, rankedProjects, unrankedProjects]);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setSpotlightProject(
      allProjects.find((p) => p.projectId === router.query.spotlightId)
    );
    setIsLoading(false);
  }, []);

  const [activeProject, setActiveProject] = useState<Project | null>(null);

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

  const handleDragStart = ({ active }: DragStartEvent) => {
    if (active.data?.current?.type === 'Spotlight') {
      setActiveProject(spotlightProject);
    }
  };

  const handleDragOver = ({ active, over, delta }: DragOverEvent) => {
    if (active == null || over == null) {
      return null;
    }

    if (active.id === over.id) {
      return null;
    }

    const activeIndex = localRankedProjects.findIndex(
      (p) => p.projectId === active.id
    );
    if (activeIndex >= 0) {
      // Active item is already in the project bar, skip
      return;
    }

    if (over.data?.current?.type === 'Ranked') {
      // setLocalSpotlightProject(null);

      setLocalRankedProjects((prev) => {
        let newRankedProjects = prev;

        const overIndex = newRankedProjects.findIndex(
          (p) => p.projectId === over.id
        );

        const newIndex = (() => {
          const putOnAfterLastItem =
            overIndex === newRankedProjects.length - 1 && delta.x > 0;
          const modifier = putOnAfterLastItem ? 1 : 0;
          return overIndex >= 0
            ? overIndex + modifier
            : newRankedProjects.length + 1;
        })();

        newRankedProjects = [
          ...newRankedProjects.slice(0, newIndex),
          activeProject,
          ...newRankedProjects.slice(newIndex),
        ];
        return newRankedProjects;
      });
    } else if (over.data?.current?.type === 'Unranked') {
      setLocalRankedProjects((prev) => {
        let newRankedProjects = prev;

        const overIndex = newRankedProjects.findIndex(
          (p) => p.projectId === over.id
        );

        const newIndex = (() => {
          const putOnAfterLastItem =
            overIndex === newRankedProjects.length - 1 && delta.x > 0;
          const modifier = putOnAfterLastItem ? 1 : 0;
          return overIndex >= 0
            ? overIndex + modifier
            : newRankedProjects.length + 1;
        })();

        newRankedProjects = [
          ...newRankedProjects.slice(0, newIndex),
          activeProject,
          ...newRankedProjects.slice(newIndex),
        ];
        return newRankedProjects;
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && over.data) {
      if (over.data.current?.type === 'Ranked') {
        const rankedIndex = rankedProjects.findIndex(
          ({ projectId }) => projectId === active.id
        );

        if (rankedIndex === -1) {
          setRankedProjects((prev) => {
            const updatedRanking = [...prev, activeProject];

            const oldIndex = updatedRanking.findIndex(
              ({ projectId }) => projectId === active.id
            );
            const newIndex = updatedRanking.findIndex(
              ({ projectId }) => projectId === over.id
            );

            if (active.id !== over.id) {
              updateProjectRanking(
                activeProject.projectId,
                activeProject.verticalId,
                user.id,
                newIndex + 1
              );

              return arrayMove(updatedRanking, oldIndex, newIndex);
            } else {
              const index = localRankedProjects.findIndex(
                ({ projectId }) => projectId === over.id
              );
              updateProjectRanking(
                activeProject.projectId,
                activeProject.verticalId,
                user.id,
                index + 1
              );

              console.log(localRankedProjects);

              return localRankedProjects;
            }
          });

          setUnrankedProjects((prev) => {
            const updatedRanking = prev.filter((p) => {
              return p.projectId !== active.id;
            });

            return updatedRanking;
          });

          localUnrankedProjects[0]
            ? setSpotlightProject(localUnrankedProjects[0])
            : setSpotlightProject(null);
        } else {
          setRankedProjects((prev) => {
            const oldIndex = prev.findIndex(
              ({ projectId }) => projectId === active.id
            );
            const newIndex = prev.findIndex(
              ({ projectId }) => projectId === over.id
            );

            if (active.id !== over.id) {
              updateProjectRanking(
                activeProject.projectId,
                activeProject.verticalId,
                user.id,
                newIndex + 1
              );

              return arrayMove(prev, oldIndex, newIndex);
            } else {
              const index = localRankedProjects.findIndex(
                ({ projectId }) => projectId === over.id
              );
              updateProjectRanking(
                activeProject.projectId,
                activeProject.verticalId,
                user.id,
                index + 1
              );

              return localRankedProjects;
            }
          });

          localUnrankedProjects[0]
            ? setSpotlightProject(localUnrankedProjects[0])
            : setSpotlightProject(null);
        }
      } else if (over.data.current?.type === 'OnHold') {
        console.log('dragging into onhold');
        // unranks if ranked
        // update onhold
      }
    }

    setActiveProject(null);
  };

  const handleDragCancel = ({ active }: DragCancelEvent) => {
    setActiveProject(null);
  };

  return (
    <div className={styles.containerSlideroom}>
      <div className={`${styles.slideroomHeader} ${styles.flexBetween}`}>
        <a href="/">&lt; Home</a>
        <h1>{spotlightProject ? spotlightProject.name : 'HackSC'}</h1>
        <button
          onClick={() => {
            router.push(`/comments/${spotlightProject.projectId}`);
          }}
        >
          CMT
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className={styles.spotlightContainer}>
          <SortableContext
            items={spotlightProject ? [spotlightProject.projectId] : []}
          >
            {spotlightProject ? (
              <SlideroomSpotlight project={spotlightProject} />
            ) : (
              "You're all caught up!"
            )}
          </SortableContext>
        </div>
        <div className={styles.slideroomProjectBar}>
          <div>
            <p>
              On Hold will be added later (yes this will put multiple copies of
              the same project in onhold as of now)
            </p>
            <SortableContext items={onHoldProjects}>
              <ul>
                {onHoldProjects.map((project) => (
                  <SlideroomOnHold key={project.projectId} project={project} />
                ))}
              </ul>
            </SortableContext>
          </div>
          <div>
            <SortableContext items={allProjectIds}>
              <ul ref={setNodeRef}>
                {localRankedProjects?.map(
                  (project) =>
                    project && (
                      <SlideroomRankProject
                        key={project.projectId}
                        project={project}
                        ranking={
                          rankedProjects.findIndex(
                            (p) => p.projectId === project.projectId
                          ) + 1
                        }
                        type={'Ranked'}
                      />
                    )
                )}
                {localUnrankedProjects?.map(
                  (project) =>
                    project && (
                      <SlideroomRankProject
                        key={project.projectId}
                        project={project}
                        ranking={null}
                        type={'Unranked'}
                      />
                    )
                )}
              </ul>
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {activeProject && (
            <motion.div animate={{ scale: 0.5 }}>
              <DragOverlaySlide project={activeProject} />
            </motion.div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Slideroom;
