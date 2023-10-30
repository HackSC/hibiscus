import { useState, useMemo, useEffect } from 'react';
import { useProjectContext } from '../ProjectContext';
import { Active, useSensors, useSensor, MouseSensor, TouchSensor, DndContext, DragOverlay, DragCancelEvent, DragEndEvent, DragStartEvent,} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import * as styles from '../pages/index.css';
import OnHoldProject from '../components/OnHoldProject';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { updateProjectRanking } from '../utils/updateProjectRanking';
import OnHoldDroppable from '../components/OnHoldDroppable';
import ProjectDraggable from '../components/ProjectDraggable';
import unrankProject from '../utils/unrankProject';
import ProjectDetails from '../components/ProjectDetails';

const Index = () => {
  const { ranked, unranked, onHold, projects } = useProjectContext();
  const [unrankedProjects, setUnrankedProjects] = unranked;
  const [rankedProjects, setRankedProjects] = ranked;
  const [allProjects, setAllProjects] = projects;
  const [onHoldProjects, setOnHoldProjects] = onHold;
  const [isDragging, setIsDragging] = useState(false);
  
  const [localUnranked, setLocalUnranked] = useState<Project[]>(unrankedProjects);
  useEffect(() => {
    setLocalUnranked(unrankedProjects.filter((p) => {
      return !onHoldProjects.some((onHoldProj) => p.projectId === onHoldProj.projectId);
    }));
  }, [unrankedProjects, onHoldProjects]);

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

  const [expandedDetails, setExpandedDetails] = useState<Project>(null);
  const expandProject = (project) => {
    setExpandedDetails(project);
  };
  useEffect(() => {
    console.log(expandedDetails)
  }, [expandedDetails])

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

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActive(active);
    setIsDragging(true);
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && over.data) {
      switch(over.data.current?.type) {
        case 'Ranked': {
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
                    newIndex + 1,
                  )

                  return arrayMove(prev, oldIndex, newIndex);
                }
              });

              break;
            }
          }

          break;
        }

        case 'Unranked': {
          if (!rankedProjects.length) {
            updateProjectRanking(
              activeProject.projectId,
              activeProject.verticalId,
              user.id,
              1
            )
          }

          break;
        }

        case 'OnHoldAdd': {
          setOnHoldProjects([...onHoldProjects, activeProject]);

          if (active.data.current?.type == 'Ranked') {
            unrankProject(
              activeProject.projectId,
              activeProject.verticalId,
              user.id,
            )

            setRankedProjects((prev) => {
              const updatedRanking = prev.filter((p) => {
                return p.projectId !== active.id;
              });

              return updatedRanking;
            });
          }

          break;
        }
      }
    }

    setActive(null);
    setIsDragging(false);
  }

  const handleDragCancel = ({ active }: DragCancelEvent) => {
    setActive(null);
    setIsDragging(false);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {expandedDetails ?
        <ProjectDetails 
          project={expandedDetails}
          expandProject={expandProject} />
      : <></>}
      {isDragging ? 
        <OnHoldDroppable type={'OnHoldAdd'} />
      : <></>}
      <header className={`${styles.header} ${styles.flexCenter}`}><img src='logo_word.png' alt='Hibiscus HackSC Logo' /></header>
      <div className={styles.containerMain}>
        {onHoldProjects[0] ? 
          <div>
            <h1>On Hold</h1>
            <button onClick={toggleOnHoldExpansion}>{isOnHoldExpanded ? 'Collapse' : 'Expand'}</button>
            <div>
              <ul className={ isOnHoldExpanded ? styles.onHoldStackExpanded : styles.onHoldStack }>
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
                        />))}
              </ul>
            </div>
          </div>
        : <></>}
        <h1>Rank</h1> <br />
        {!allProjects[0] ? <p>Loading...</p> : <></>}
          <SortableContext items={allProjectIds}>
            <ul>
              {rankedProjects.map((project) => (
                project && (<ProjectDraggable
                  key={project.projectId}
                  project={project}
                  ranking={rankedProjects.findIndex(
                    (p) => p.projectId === project.projectId
                  )}
                  type={'Ranked'}
                  expandProject={expandProject}
                />)
              ))}
              {localUnranked?.map((project) => (
                project && (<ProjectDraggable
                  key={project.projectId}
                  project={project}
                  ranking={null}
                  type={'Unranked'}
                  expandProject={expandProject}
                />)
              ))}
            </ul>
          </SortableContext>

          <DragOverlay>
            {activeProject && (
              <ProjectDraggable
                project={activeProject}
                ranking={null}
                type={'Ranked'}
                expandProject={expandProject}
              />
            )}
          </DragOverlay>
      </div>
    </DndContext >
  );
};

export default Index;