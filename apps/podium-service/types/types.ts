export interface VerticalData {
  verticalId: string;
  name: string;
  description: string | null;
}

export interface ProjectData {
  projectId: string;
  name: string;
  teamMembers: string[] | null;
  description: string | null;
  imageUrl: string | null;
  devpostUrl: string | null;
  videoUrl: string | null;
  verticalId: string;
  verticalName: string;
}

export interface EditableProjectData extends ProjectData {
  verticalNew: string;
}

export interface Ranking {
  rank: number;
}

export interface RankedProject {
  projectId: string;
  projectName: string;
  verticalId: string;
  verticalName: string;
  rankings: Ranking[];
}

export interface RankedProjectData extends Omit<RankedProject, 'rankings'> {
  rank: number;
}

export interface JudgeData {
  id: string;
  name: string;
  email: string;
  verticalId: string | null;
  verticalName: string | null;
}

export interface CommentData {
  comment: string;
  name: string;
  profilePicUrl: string;
  createdAt: Date;
}

export interface NotesData {
  notes: string;
}
