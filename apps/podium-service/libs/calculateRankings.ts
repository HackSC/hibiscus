import { calculatePoints } from 'apps/podium-service/libs/calculatePoints';
import { supabase } from 'apps/podium-service/libs/supabase';

interface ProjectPointsData {
  project: RankedProject;
  points: number;
}

const calculateRankings = async (verticalId: string) => {
  /*
      Overall rankings are calculated as follows:
      - Rank 1: 10 pts
      - Rank 2: 5 pts
      - Rank 3: 2 pts
      - Rank 4: 1 pt
      - Rank 5: 1 pt

      Points from all judges are tallied up to determine the final ranking
    */
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*, ranking!inner(rank), verticals!inner(name)')
        .eq('vertical_id', verticalId);

      if (error) {
        throw error;
      }

      const projects = data.map((p: any) => ({
        projectId: p.project_id,
        projectName: p.name,
        verticalId: p.vertical_id,
        verticalName: p.verticals.name,
        rankings: p.ranking,
      }));

      const projectPoints = new Map<RankedProject, number>();
      projects.forEach((p) => {
        projectPoints.set(p, calculatePoints(p.rankings));
      });

      const groupedProjects: { [key: number]: ProjectPointsData[] } = {};
      projectPoints.forEach((points, project) => {
        if (!groupedProjects[points]) {
          groupedProjects[points] = [];
        }
        groupedProjects[points].push({ project, points });
      });

      const sortedProjectPoints = Object.keys(groupedProjects).sort(
        (a, b) => parseInt(b) - parseInt(a)
      );

      let currentRank = 0;
      let previousPoints = Number.MAX_SAFE_INTEGER;
      const rankings: RankedProjectData[] = [];
      sortedProjectPoints.forEach((key) => {
        groupedProjects[key].forEach((p) => {
          if (parseInt(key) < previousPoints) {
            currentRank++;
          }
          previousPoints = parseInt(key);

          const project = {
            projectId: p.project.projectId,
            projectName: p.project.projectName,
            verticalId: p.project.verticalId,
            verticalName: p.project.verticalName,
            rank: currentRank,
          };

          rankings.push(project);
        });
      });

      for (const r of rankings) {
        const { data, error } = await supabase.from('ranking_final').upsert({
          project_id: r.projectId,
          rank: r.rank,
        });
      }
    } catch (error) {
      console.error("Internal Server Error");
    }
}

export { calculateRankings };
