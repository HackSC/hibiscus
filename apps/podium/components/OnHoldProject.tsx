import * as styles from '../pages/index.css';
import { FC } from 'react';
import Link from 'next/link';

interface OnHoldProjectProps {
  project: Project;
  type: Container;
  isExpanded: boolean;
}

const OnHoldProject: FC<OnHoldProjectProps> = ({ project, type, isExpanded }) => {
  return (
    <li>
      {isExpanded
      ? <Link
          href={`/slideroom/?spotlightId=${project.projectId}`}
          as={'/slideroom'}
        >
          <img src='chuubear.jpeg' className={styles.onHoldPreviewFull} />
        </Link>
      : <img src='chuubear.jpeg' className={styles.onHoldPreview} />}
    </li>
  )
}

export default OnHoldProject;