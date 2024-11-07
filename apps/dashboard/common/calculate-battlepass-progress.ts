export function calculateBattlepassProgress(
  points: number
): BattlepassProgress {
  if (points >= BATTLEPASS_LEVEL_POINTS[3]) {
    return {
      level: 3,
      progress: 1,
      nextLevel: BATTLEPASS_LEVEL_POINTS[3],
    };
  } else if (points >= BATTLEPASS_LEVEL_POINTS[2]) {
    return {
      level: 2,
      progress:
        (points - BATTLEPASS_LEVEL_POINTS[2]) /
        (BATTLEPASS_LEVEL_POINTS[3] - BATTLEPASS_LEVEL_POINTS[2]),
      nextLevel: BATTLEPASS_LEVEL_POINTS[3],
    };
  } else if (points >= BATTLEPASS_LEVEL_POINTS[1]) {
    return {
      level: 1,
      progress:
        (points - BATTLEPASS_LEVEL_POINTS[1]) /
        (BATTLEPASS_LEVEL_POINTS[2] - BATTLEPASS_LEVEL_POINTS[1]),
      nextLevel: BATTLEPASS_LEVEL_POINTS[2],
    };
  } else {
    return {
      level: 0,
      progress: points / BATTLEPASS_LEVEL_POINTS[1],
      nextLevel: BATTLEPASS_LEVEL_POINTS[1],
      points,
    };
  }
}

export const BATTLEPASS_LEVEL_POINTS = {
  0: 0,
  1: 425,
  2: 750,
  3: 1125,
};

export interface BattlepassProgress {
  level: number;
  progress: number;
  nextLevel?: number;
  points?: number;
}
