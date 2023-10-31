import { CSSProperties } from 'react';
import * as styles from '../styles/index.css';
import { FC } from 'react';
import { Container, Project } from '../types';

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
  const imgStyle = {
    backgroundImage: `url(${project.imageUrl})`,
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
