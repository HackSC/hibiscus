import { useSortable } from '@dnd-kit/sortable';
import { FC, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import * as styles from '../styles/index.css';
import { useProjectContext } from '../ProjectContext';
import RankIcon from './RankIcon';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';
import { Container, Project } from '../types';

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

  const image = useMemo(() => {
    if (project?.videoUrl) {
      const ytThumbnail = getYoutubeThumbnail(project.videoUrl);
      if (ytThumbnail) {
        return ytThumbnail;
      }
    }
    return project?.imageUrl;
  }, [project]);

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1.0,
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundImage: `url(${image})`,
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
