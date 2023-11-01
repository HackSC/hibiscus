import { FC } from 'react';
import * as styles from '../styles/index.css';
import { Project } from '../types';
import Link from 'next/link';

interface ProjectDetailsProps {
  project: Project;
  expandProject;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({
  project,
  expandProject,
}) => {
  if (project == null) {
    return null;
  }

  const imgStyle = {
    backgroundImage: `url(${project.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={`${styles.detailsProject} ${styles.roundCorners}`}>
        <div style={imgStyle} className={styles.detailsImg}>
          <img
            src="button_close.svg"
            alt="Close project details"
            className={styles.detailsButtons}
            onClick={() => expandProject(null)}
          />
        </div>
        <div className={styles.detailsInfo}>
          <Link href={`/comments/${project.projectId}`}>
            <img
              src="button_comment.svg"
              alt="See project comments"
              className={styles.detailsButtons}
            />
          </Link>
          <h2>{project.name}</h2>
          <h3>
            By:&nbsp;
            {project.teamMembers?.map((mem, i) =>
              project.teamMembers[i + 1] ? (
                <span>{mem}, </span>
              ) : (
                <span>{mem}</span>
              )
            )}
          </h3>
          <p>{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
