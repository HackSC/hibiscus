import { FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import * as styles from '../pages/index.css';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';

interface DragOverlaySlideProps {
  project: Project;
}

const DragOverlaySlide: FC<DragOverlaySlideProps> = ({ project }) => {
  const image = useMemo(() => {
    if (project?.videoUrl) {
      const ytThumbnail = getYoutubeThumbnail(project.videoUrl);
      if (ytThumbnail) {
        return ytThumbnail;
      }
    }
    return project?.imageUrl;
  }, [project]);

  const imgStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    zIndex: 1,
  };

  return (
    <div className={`${styles.spotlightDrag} ${styles.roundCorners}`}>
      <motion.div
        style={imgStyle}
        className={styles.spotlightImg}
        animate={{ height: '100%' }}
      />
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

export default DragOverlaySlide;
