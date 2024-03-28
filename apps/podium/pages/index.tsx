import { useState, useMemo, useEffect } from 'react';
import { useProjectContext } from '../ProjectContext';
import {
  Active,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DndContext,
  DragOverlay,
  DragCancelEvent,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import * as styles from '../styles/index.css';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { updateProjectRanking } from '../utils/updateProjectRanking';
import OnHoldDroppable from '../components/OnHoldDroppable';
import ProjectDraggable from '../components/ProjectDraggable';
import unrankProject from '../utils/unrankProject';
import ProjectDetails from '../components/ProjectDetails';
import OnHoldPreview from '../components/OnHoldPreview';
import { Project } from '../types';
import { BsQuestionCircle } from 'react-icons/bs';
import { Modal } from '../utils/modal/modal';
import smoothscroll from 'smoothscroll-polyfill';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { HibiscusRole } from '@hibiscus/types';
import { BiSearch } from 'react-icons/bi';

const Index = () => {
  const env = getEnv();

  const { ranked, unranked, onHold, projects } = useProjectContext();
  const [unrankedProjects, setUnrankedProjects] = unranked;
  const [rankedProjects, setRankedProjects] = ranked;
  const [allProjects, setAllProjects] = projects;
  const [onHoldProjects, setOnHoldProjects] = onHold;
  const [isDragging, setIsDragging] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  const [localRanked, setLocalRanked] = useState<Project[]>(null);
  useEffect(() => {
    setLocalRanked(rankedProjects);
  }, [rankedProjects]);

  const [localUnranked, setLocalUnranked] =
    useState<Project[]>(unrankedProjects);
  useEffect(() => {
    setLocalUnranked(
      unrankedProjects.filter((p) => {
        return !onHoldProjects.some(
          (onHoldProj) => p.projectId === onHoldProj.projectId
        );
      })
    );
  }, [unrankedProjects, onHoldProjects]);

  const { user } = useHibiscusUser();

  const allProjectIds = useMemo(() => {
    if (localRanked && localUnranked) {
      return [...localRanked, ...localUnranked].map((p) => p.projectId);
    } else {
      return [];
    }
  }, [localUnranked, localRanked]);

  const onHoldProjectIds = useMemo(
    () => onHoldProjects.map((p) => p.projectId),
    [onHoldProjects]
  );

  const [active, setActive] = useState<Active | null>(null);
  const activeProject = useMemo(
    () => allProjects.find((p) => p.projectId === active?.id),
    [active, allProjects, onHoldProjects]
  );

  const [expandedDetails, setExpandedDetails] = useState<Project>(null);
  const expandProject = (project) => {
    setExpandedDetails(project);
  };

  const [isOnHoldExpanded, setIsOnHoldExpanded] = useState<boolean>(false);
  const toggleOnHoldExpansion = () => {
    setIsOnHoldExpanded((prevExpanded) => !prevExpanded);
  };

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    if (!isSearchOpen) {
      setTimeout(() => {
        setSearchInput('');
      }, 1000);
    }
  }, [isSearchOpen]);

  const handleSearch = () => {
    let searchQuery = (document.getElementById('searchbox') as HTMLInputElement)
      .value;
    setSearchInput(searchQuery);
  };

  smoothscroll.polyfill();
  const handleScroll = (search: string) => {
    const element = document.getElementById(`project-${search}`);

    setIsSearchOpen(false);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
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
    if (active.data.current?.type !== 'OnHold') {
      setIsDragging(true);
    }
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (active === null || over === null) {
      return null;
    }

    if (active.id === over.id) {
      return null;
    }

    if (active.id in allProjectIds) {
      return null;
    }

    if (
      active.data.current?.type === 'OnHold' &&
      over.data.current?.type === 'Ranked'
    ) {
      setRankedProjects((prev) => [...prev, activeProject]);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (active === null || over === null) {
      return null;
    }

    if (over && over.data) {
      switch (over.data.current?.type) {
        case 'Ranked':
          switch (active.data.current?.type) {
            case 'Unranked':
              setRankedProjects((prev) => {
                const updatedRanking = [...prev, activeProject];

                if (active.id !== over.id) {
                  const oldIndex = prev.findIndex(
                    ({ projectId }) => projectId === active.id
                  );
                  const newIndex = rankedProjects.findIndex(
                    ({ projectId }) => projectId === over.id
                  );

                  updateProjectRanking(
                    activeProject.projectId,
                    activeProject.verticalId,
                    user.id,
                    newIndex + 1,
                    getCookie(env.Hibiscus.Cookies.accessTokenName)?.toString()
                  );

                  return arrayMove(updatedRanking, oldIndex, newIndex);
                }
              });

              break;

            case 'Ranked':
              setRankedProjects((prev) => {
                if (active.id !== over.id) {
                  const oldIndex = prev.findIndex(
                    ({ projectId }) => projectId === active.id
                  );
                  const newIndex = rankedProjects.findIndex(
                    ({ projectId }) => projectId === over.id
                  );

                  updateProjectRanking(
                    activeProject.projectId,
                    activeProject.verticalId,
                    user.id,
                    newIndex + 1,
                    getCookie(env.Hibiscus.Cookies.accessTokenName)?.toString()
                  );

                  return arrayMove(prev, oldIndex, newIndex);
                } else {
                  const newIndex = rankedProjects.findIndex(
                    ({ projectId }) => projectId === over.id
                  );

                  updateProjectRanking(
                    activeProject.projectId,
                    activeProject.verticalId,
                    user.id,
                    newIndex + 1,
                    getCookie(env.Hibiscus.Cookies.accessTokenName)?.toString()
                  );

                  return prev;
                }
              });

              break;
          }

          setUnrankedProjects((prev) =>
            prev.filter((p) => p.projectId !== active.id)
          );
          setOnHoldProjects((prev) =>
            prev.filter((p) => p.projectId !== active.id)
          );

          break;

        case 'Unranked': {
          const index = allProjectIds.findIndex(
            (projectId) => projectId === over.id
          );
          if (
            active.data.current?.type === 'Unranked' &&
            index === rankedProjects.length
          ) {
            updateProjectRanking(
              activeProject.projectId,
              activeProject.verticalId,
              user.id,
              index + 1,
              getCookie(env.Hibiscus.Cookies.accessTokenName)?.toString()
            );

            setRankedProjects((prev) => [...prev, activeProject]);
            setUnrankedProjects((prev) =>
              prev.filter((p) => p.projectId !== active.id)
            );
            setOnHoldProjects((prev) =>
              prev.filter((p) => p.projectId !== active.id)
            );
          } else if (onHoldProjectIds.includes(active.id)) {
            setRankedProjects((prev) =>
              prev.filter((p) => p.projectId !== active.id)
            );
          }

          break;
        }

        case 'OnHoldAdd':
          setOnHoldProjects([activeProject, ...onHoldProjects]);
          setUnrankedProjects([...unrankedProjects, activeProject]);

          if (active.data.current?.type === 'Ranked') {
            unrankProject(
              activeProject.projectId,
              activeProject.verticalId,
              user.id,
              getCookie(env.Hibiscus.Cookies.accessTokenName)?.toString()
            );

            setRankedProjects((prev) =>
              prev.filter((p) => p.projectId !== active.id)
            );
          }

          break;
      }
    }

    setActive(null);
    setIsDragging(false);
  };

  const handleDragCancel = ({ active }: DragCancelEvent) => {
    setActive(null);
    setIsDragging(false);
  };

  if (user == null) {
    return <></>;
  }

  if (user?.role !== HibiscusRole.JUDGE) {
    window.location.assign(env.Hibiscus.AppURL.portal);
    return <></>;
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Modal
        isOpen={expandedDetails !== null}
        closeModal={() => expandProject(null)}
      >
        <ProjectDetails
          project={expandedDetails}
          expandProject={expandProject}
        />
      </Modal>
      {isDragging && <OnHoldDroppable type={'OnHoldAdd'} />}

      <header className={`${styles.header} ${styles.flexCenter}`}>
        <img src="logo_word.png" alt="Hibiscus HackSC Logo" />
        <BiSearch
          color="#FFFFFF"
          size="30px"
          style={{ position: 'absolute', right: '70px' }}
          className={styles.cursorPointer}
          onClick={() => setIsSearchOpen(true)}
        />
        <BsQuestionCircle
          color="#FFFFFF"
          size="30px"
          style={{ position: 'absolute', right: '20px' }}
          className={styles.cursorPointer}
          onClick={() => setIsInstructionsOpen(true)}
        />
      </header>

      <Modal isOpen={isSearchOpen} closeModal={() => setIsSearchOpen(false)}>
        <div className={`${styles.containerSearch} ${styles.roundCorners}`}>
          <input
            type="text"
            id="searchbox"
            className={styles.searchBar}
            placeholder="Search for projects"
            onChange={() => handleSearch()}
          />
          <ul>
            { allProjects.map(
              (p) =>
                searchInput && p.projectName.toLowerCase().includes(searchInput.toLowerCase()) && (
                  <li
                    key={p.projectId}
                    className={styles.searchResult}
                    onClick={() => handleScroll(p.projectId)}
                  >
                    {p.projectName}
                  </li>
                )
            )}
          </ul>
        </div>
      </Modal>

      <Modal
        isOpen={isInstructionsOpen}
        closeModal={() => setIsInstructionsOpen(false)}
      >
        <div
          className={`${styles.containerInstructions} ${styles.roundCorners}`}
        >
          <div className={styles.flexBetween}>
            <h1>Judging Criteria</h1>
            <img
              src="button_close.svg"
              alt="Close project details"
              className={styles.cursorPointer}
              onClick={() => setIsInstructionsOpen(false)}
            />
          </div>{' '}
          <br />
          <p>
            There are general criteria that apply to every project, as well as
            vertical-specific criteria that will only be used by judges that are
            assigned to that vertical. The following will provide an overview of
            the criteria we're looking for. We recommend considering these
            criteria when ranking the projects in the judging portal.
          </p>
          <h3>Technological complexity</h3>
          <ul>
            <li>
              • How challenging was it for the team to complete in the 24-hour
              window?
            </li>
            <li>
              • Is the project technologically impressive? Complex? Does it seem
              remarkable that someone could achieve this hack in just a day or
              two?
            </li>
          </ul>
          <h3>Functionality</h3>
          <ul>
            <li>• How functional is this hack at the time of the demo?</li>
            <li>
              • Completeness - has the team thought through and/or planned how
              to develop and launch/release their product?
            </li>
            <li>
              • Is the project realistic? This includes vetting of idea, plans
              for development, marketing, deployment, etc.
            </li>
          </ul>
          <h3>Feasibility</h3>
          <ul>
            <li>
              • How practical and achievable is the hack idea being presented
              (considering the 36-hour window, technology, and other resources)?
              Is it scalable?
            </li>
          </ul>
          <h3>“Wow factor”</h3>
          <ul>
            <li>• Impressiveness - How original is the idea?</li>
            <li>
              • Creativity - Has this hack been done before? Does this project
              make others think this is a really cool idea and question why they
              didn't think of it before?
            </li>
          </ul>
          <h3>Passion</h3>
          <ul>
            <li>
              • How excited and passionate is the team about solving the problem
              they chose?
            </li>
          </ul>
          <h3>Vertical Alignment</h3>
          <ul>
            <li>
              • <strong>Energy:</strong> Power a Sustainable Future
            </li>
            <li>
              • <strong>Accessibility:</strong> Opening the World
            </li>
            <li>
              • <strong>Learning:</strong> Exploring Beyond the Classroom
            </li>
            <li>
              • <strong>Healthcare:</strong> Patient Safety Technology Challenge{' '}
              <em>(Sponsored)</em>
            </li>
          </ul>
        </div>
      </Modal>

      <div className={styles.containerMain}>
        {onHoldProjects[0] ? (
          <div>
            <div className={styles.flexBetween}>
              <h1 style={{ marginLeft: '8px' }}>On Hold</h1>
              <button onClick={toggleOnHoldExpansion}>
                {isOnHoldExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <br />
            <div>
              {isOnHoldExpanded ? (
                <SortableContext items={onHoldProjectIds}>
                  <ul className={styles.onHoldStackExpanded}>
                    {onHoldProjects.map((project, index) => (
                      <ProjectDraggable
                        key={project.projectId}
                        project={
                          onHoldProjects[onHoldProjects.length - 1 - index]
                        }
                        ranking={null}
                        type={'OnHold'}
                        expandProject={expandProject}
                      />
                    ))}
                  </ul>
                </SortableContext>
              ) : (
                <ul className={styles.onHoldStack}>
                  {onHoldProjects
                    .slice(0, 3)
                    .reverse()
                    .map((project, index) => (
                      <OnHoldPreview
                        key={project.projectId}
                        project={project}
                        type={'OnHold'}
                        index={index}
                      />
                    ))}
                </ul>
              )}
            </div>
            <br />
          </div>
        ) : (
          <></>
        )}
        <div style={{ margin: '0px 8px' }} className={styles.flexBetween}>
          <h1>Rank</h1>
        </div>
        <br />
        {!allProjects[0] ? (
          <p style={{ marginLeft: '8px' }}>Welcome to Podium!</p>
        ) : (
          <></>
        )}
        <SortableContext items={allProjectIds}>
          <ul>
            {rankedProjects.map(
              (project) =>
                project && (
                  <ProjectDraggable
                    key={project.projectId}
                    project={project}
                    ranking={rankedProjects.findIndex(
                      (p) => p.projectId === project.projectId
                    )}
                    type={'Ranked'}
                    expandProject={expandProject}
                  />
                )
            )}
            {localUnranked?.map(
              (project) =>
                project && (
                  <ProjectDraggable
                    key={project.projectId}
                    project={project}
                    ranking={null}
                    type={'Unranked'}
                    expandProject={expandProject}
                  />
                )
            )}
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
    </DndContext>
  );
};

export default Index;
