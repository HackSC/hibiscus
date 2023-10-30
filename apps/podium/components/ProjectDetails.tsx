import { FC } from 'react';
import * as styles from '../pages/index.css';

interface ProjectDetailsProps {
  project: Project;
  expandProject;
}

const ProjectDetails: FC<ProjectDetailsProps> = ({ project, expandProject }) => {
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
            src='button_close.png' alt='Close project details'
            className={styles.detailsClose}
            onClick={() => expandProject(null)} />
        </div>
        <div className={styles.detailsInfo}>
          <h2>{project.name}</h2>
          <h3>By: 
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
      <div className={styles.backgroundBlur}></div>
    </div>
  )
}

export default ProjectDetails;