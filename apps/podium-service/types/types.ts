interface VerticalData {
  verticalId: string;
  name: string;
  description: string | null;
}

interface ProjectData {
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

interface EditableProjectData extends ProjectData {
  verticalNew: string;
}

interface Ranking {
  rank: number;
}

interface RankedProject {
  projectId: string;
  projectName: string;
  verticalId: string;
  verticalName: string;
  rankings: Ranking[];
}

interface RankedProjectData extends Omit<RankedProject, 'rankings'> {
  rank: number;
}

interface JudgeData {
  id: string;
  name: string;
  email: string;
  verticalId: string | null;
  verticalName: string | null;
}

interface CommentData {
  comment: string,
  name: string,
  profilePicUrl: string,
  createdAt: Date,
}

interface NotesData {
  notes: string,
}
