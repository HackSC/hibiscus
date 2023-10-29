import { useSortable } from '@dnd-kit/sortable';
import { FC, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import * as styles from '../styles/index.css';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';
import { Project } from '../types';

interface SlideroomSpotlightProps {
  project: Project;
}

const SlideroomSpotlight: FC<SlideroomSpotlightProps> = ({ project }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: project.projectId,
    data: {
      type: 'Spotlight',
    },
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
  };

  const imgStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div
      className={`${styles.spotlight} ${styles.roundCorners}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div style={imgStyle} className={styles.spotlightImg}></div>
      <div className={styles.spotlightInfo}>
        <h3>Members:</h3>
        <p>
          {project.teamMembers?.map((mem, i) =>
            project.teamMembers[i + 1] ? (
              <span>{mem}, </span>
            ) : (
              <span>{mem}</span>
            )
          )}
        </p>
        <h3>Project Description:</h3>
        <p className={styles.truncate}>{project.description}</p>
      </div>
    </div>
  );
};

export default SlideroomSpotlight;
