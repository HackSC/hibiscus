import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import * as styles from '../pages/index.css';
import { useProjectContext } from '../ProjectContext';
import RankIcon from './RankIcon';

interface SlideroomRankProjectProps {
  project: Project;
  ranking: number | null;
  type: Container;
}

const SlideroomRankProject: FC<SlideroomRankProjectProps> = ({
  project,
  ranking,
  type,
}) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: project.projectId,
    data: { type },
    disabled: true,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1.0,
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundImage: `url(${project.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const { ranked, unranked, onHold, spotlight } = useProjectContext();
  const [rankedProjects, setRankedProjects] = ranked;
  const [onHoldProjects, setOnHoldProjects] = onHold;
  const [spotlightProject, setSpotlightProject] = spotlight;

  // PROBLEM: it seems that this returns back into the dom with a null value
  // visually it appears fine, but dragging over previously-spotlighted projects will just show null
  // however, clicking on the prev-spotlighted proj will still switch it back into the spotlight like normal
  const switchSpotlight = (project: Project) => {
    console.log('spotlight', project);

    const rankedIndex = rankedProjects.findIndex(
      ({ projectId }) => projectId === project.projectId
    );

    // HANDLE ON HOLD
    // if (rankedIndex === -1) {
    //   setOnHoldProjects((prev) => [...prev, spotlightProject]);
    // }

    setSpotlightProject(project);

    // Refresh local ranked/unranked projects so that the spotlight project "returns" to the project bar
    // setRankedProjects((prev) => prev);
    // setUnrankedProjects((prev) => prev);
  };

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={styles.projectSlide}
      onClick={() => switchSpotlight(project)}
    >
      <RankIcon rank={ranking} />
    </li>
  );
};

export default SlideroomRankProject;
