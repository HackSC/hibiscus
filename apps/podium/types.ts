export interface Project {
  projectId: string;
  verticalId: string;
  name: string;
  teamMembers: string[] | null;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
}

export type Container = 'OnHold' | 'OnHoldAdd' | 'Ranked' | 'Unranked';
