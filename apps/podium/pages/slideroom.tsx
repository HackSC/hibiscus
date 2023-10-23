import { useEffect, useMemo, useState } from 'react';
import { Active, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import SlideroomSpotlight from '../components/SlideroomSpotlight';
import SlideroomOnHold from '../components/SlideroomOnHold';
import SlideroomRankProject from '../components/SlideroomRankProject';
import { useProjectContext } from '../ProjectContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import * as styles from '../pages/index.css';
import { FC } from 'react';
import DragOverlaySlide from '../components/DragOverlaySlide';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { updateProjectRanking } from '../utils/updateProjectRanking';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface slideroomProps {}

const Slideroom: FC<slideroomProps> = () => {
  const { ranked, unranked, onHold, projects, spotlight } = useProjectContext();
  const [unrankedProjects, setUnrankedProjects] = unranked;
  const [rankedProjects, setRankedProjects] = ranked;
  const [allProjects, setAllProjects] = projects;
  const [onHoldProjects, \Projects] = onHold;
  const [spotlightProject, setSpotlightProject] = spotlight;
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useHibiscusUser();

  const allProjectIds = useMemo(
    () => allProjects.map((p) => p.projectId),
    [allProjects]
  );

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    setSpotlightProject(
      allProjects.find((p) => p.projectId === router.query.spotlightId)
    );
    setIsLoading(false);
  }, []);

  const [active, setActive] = useState<Active | null>(null);
  const activeProject = useMemo(
    () => allProjects.find((p) => p.projectId === active?.id),
    [active, allProjects]
  );

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
      if (active.data.current?.type === 'Spotlight') {
        switch (over.data.current?.type) {
          case 'Ranked': {
            const rankedIndex = rankedProjects.findIndex(
              ({ projectId }) => projectId === active.id
            );

            if (rankedIndex === -1) {
              setRankedProjects((prev) => {
                const updatedRanking = [...prev, activeProject];

                if (active.id !== over.id) {
                  const oldIndex = prev.findIndex(
                    ({ projectId }) => projectId === active.id
                  );
                  const newIndex = prev.findIndex(
                    ({ projectId }) => projectId === over.id
                  );

                  updateProjectRanking(
                    activeProject.projectId,
                    activeProject.verticalId,
                    user.id,
                    newIndex + 1,
                  )

                  return arrayMove(updatedRanking, oldIndex, newIndex);
                }
              });

              setUnrankedProjects((prev) => {
                const updatedRanking = prev.filter((p) => {
                  return p.projectId !== active.id;
                });

                return updatedRanking;
              });

              unrankedProjects[0]
                ? setSpotlightProject(unrankedProjects[0])
                : setSpotlightProject(null);
            } else {
              setRankedProjects((prev) => {
                if (active.id !== over.id) {
                  const oldIndex = prev.findIndex(
                    ({ projectId }) => projectId === active.id
                  );
                  const newIndex = prev.findIndex(
                    ({ projectId }) => projectId === over.id
                  );

                  updateProjectRanking(
                    activeProject.projectId,
                    activeProject.verticalId,
                    user.id,
                    newIndex + 1,
                  )

                  return arrayMove(prev, oldIndex, newIndex);
                }
              });

              unrankedProjects[0]
                ? setSpotlightProject(unrankedProjects[0])
                : setSpotlightProject(null);
            }

            break;
          }
          case 'OnHold':
            console.log('dragging into onhold');
            // unranks if ranked
            // update onhold
            break;
        }
      }
    }

    setActive(null);
  }

  return (
    <div className={styles.containerSlideroom}>
      <div className={`${styles.slideroomHeader} ${styles.flexBetween}`}>
        <a href="/">&lt; Home</a>
        <h1>{spotlightProject ? spotlightProject.name : 'HackSC'}</h1>
        <button>CMT</button>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          setActive(active);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => {
          setActive(null);
        }}
      >
        <div className={styles.spotlightContainer}>
          {spotlightProject ? (
            <SlideroomSpotlight project={spotlightProject} />
          ) : (
            "You're all caught up!"
          )}
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
              <ul>
                {rankedProjects.map((project) =>
                  spotlightProject &&
                  spotlightProject.projectId === project.projectId ? (
                    <></>
                  ) : (
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
                {unrankedProjects.map((project) =>
                  spotlightProject &&
                  spotlightProject.projectId === project.projectId ? (
                    <></>
                  ) : (
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
