import { CSSProperties, useMemo } from 'react';
import * as styles from '../styles/index.css';
import { FC } from 'react';
import { Container, Project } from '../types';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';

interface OnHoldDraggableProps {
  project: Project;
  type: Container;
  index: number;
}

const OnHoldDraggable: FC<OnHoldDraggableProps> = ({
  project,
  type,
  index,
}) => {
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
  };

  return (
    <li
      style={imgStyle}
      className={`${styles.onHoldPreview} ${styles.roundCorners} ${
        index !== 0 ? styles.boxShadowY : ''
      }`}
    />
  );
};

export default OnHoldDraggable;
