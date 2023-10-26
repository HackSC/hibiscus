import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import * as styles from '../pages/index.css';

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

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1.0,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const imgStyle = {
    backgroundImage: `url(${project.imageUrl})`,
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
