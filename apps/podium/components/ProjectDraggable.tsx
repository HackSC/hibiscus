import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useMemo } from 'react';
import * as styles from '../styles/index.css';
import { FC } from 'react';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';
import { Container, Project } from '../types';

interface ProjectDraggableProps {
  project: Project;
  ranking: number | null;
  type: Container;
  expandProject;
}

const ProjectDraggable: FC<ProjectDraggableProps> = ({
  project,
  ranking,
  type,
  expandProject,
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

  return (
    <li
      id={`project-${project.projectId}`}
      className={`${styles.projectPreview} ${styles.roundCorners}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className={`${styles.backgroundDim} ${styles.roundCorners}`}></div>
      <div className={`${styles.zTop} ${styles.flexStart} ${styles.width90}`}>
        <span className={styles.rankBasic}>
          {ranking === null ? '-' : ranking + 1}
        </span>
        <div className={styles.truncateText}>
          <h3
            className={styles.cursorPointer}
            onClick={() => expandProject(project)}
          >
            {project.projectName}
          </h3>
          <span className={styles.thinFont}>{project.description}</span>
        </div>
      </div>
    </li>
  );
};

export default ProjectDraggable;
