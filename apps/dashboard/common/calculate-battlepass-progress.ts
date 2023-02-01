export function calculateBattlepassProgress(
  points: number
): BattlepassProgress {
  if (points >= BattlepassLevels[3]) {
    return {
      level: 3,
      progress: 1,
    };
  } else if (points >= BattlepassLevels[2]) {
    return {
      level: 2,
      progress:
        (points - BattlepassLevels[2]) /
        (BattlepassLevels[3] - BattlepassLevels[2]),
      nextLevel: BattlepassLevels[3],
    };
  } else if (points >= BattlepassLevels[1]) {
    return {
      level: 1,
      progress:
        (points - BattlepassLevels[1]) /
        (BattlepassLevels[2] - BattlepassLevels[1]),
      nextLevel: BattlepassLevels[2],
    };
  } else {
    return {
      level: 0,
      progress: points / (BattlepassLevels[1] - BattlepassLevels[0]),
      nextLevel: BattlepassLevels[1],
    };
  }
}

const BattlepassLevels = {
  1: 425,
  2: 750,
  3: 1125,
};

interface BattlepassProgress {
  level: number;
  progress: number;
  nextLevel?: number;
}
