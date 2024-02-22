interface VerticalData {
  verticalId: string;
  name: string;
  description: string | null;
};

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
};

interface EditableProjectData extends ProjectData {
  verticalNew: string;
}
