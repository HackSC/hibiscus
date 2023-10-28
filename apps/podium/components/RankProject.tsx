import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useMemo } from 'react';
import * as styles from '../pages/index.css';
import { FC } from 'react';
import Link from 'next/link';

interface RankProjectProps {
  project: Project;
  ranking: number | null;
  type: Container;
}

const RankProject: FC<RankProjectProps> = ({ project, ranking, type }) => {
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
    const regex =
      /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    return project.videoUrl
      ? `https://img.youtube.com/vi/${project.videoUrl.match(regex)[1]}/0.jpg`
      : project.imageUrl;
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
      className={`${styles.projectPreview} ${styles.roundCorners}`}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      <div className={`${styles.backgroundDim} ${styles.roundCorners}`}></div>
      <div className={`${styles.zTop} ${styles.flexStart}`}>
        <span className={styles.rankBasic}>
          {ranking === null ? '-' : ranking + 1}
        </span>
        <div className={styles.truncateText}>
          <Link
            href={`/slideroom/?spotlightId=${project.projectId}`}
            as={'/slideroom'}
          >
            <h3>{project.name}</h3>
          </Link>
          <span className={styles.thinFont}>{project.description}</span>
        </div>
      </div>
    </li>
  );
};

export default RankProject;
