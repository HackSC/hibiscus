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
    // backgroundImage: `url(${project.imageUrl})`,
    backgroundImage: 'url(chuubear.jpeg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const { ranked, onHold, spotlight } = useProjectContext();
  const [rankedProjects, setRankedProjects] = ranked;
  const [onHoldProjects, setOnHoldProjects] = onHold;
  const [spotlightProject, setSpotlightProject] = spotlight;

  // PROBLEM: it seems that this returns back into the dom with a null value
  // visually it appears fine, but dragging over previously-spotlighted projects will just show null
  // however, clicking on the prev-spotlighted proj will still switch it back into the spotlight like normal
  const switchSpotlight = (project: Project) => {
    console.log('spotlight', project);

    const rankedIndex = rankedProjects.findIndex(
      ({ projectId }) => projectId === spotlightProject.projectId
    );

    console.log(rankedIndex);
    console.log(rankedProjects);

    if (rankedIndex === -1) {
      setOnHoldProjects((prev) => [...prev, spotlightProject]);
    }

    setSpotlightProject(project);
  };

  console.log(ranking);

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
