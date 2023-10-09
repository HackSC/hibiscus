import { createContext, useState } from 'react';

interface ProjectContextType {
  ranked: any[];
  unranked: any[];
  onHold: any[];
  projects: any[];
  spotlight: any[];
}

export const ProjectContext = createContext<ProjectContextType>({} as ProjectContextType);

export default ProjectContext;