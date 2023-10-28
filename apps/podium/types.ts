interface Project {
  projectId: string;
  verticalId: string;
  name: string;
  teamMembers: string[] | null;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
}

type Container = 'Spotlight' | 'OnHold' | 'Ranked' | 'Unranked';
