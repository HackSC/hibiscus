/*
      Overall rankings are calculated as follows:
      - Rank 1: 10 pts
      - Rank 2: 5 pts
      - Rank 3: 2 pts
      - Rank 4: 1 pt
      - Rank 5: 1 pt

      Points from all judges are tallied up to determine the final ranking
    */
const calculatePoints = (rankings: Ranking[]): number => {
  let totalPoints = 0;

  rankings.forEach((r) => {
    switch (r.rank) {
      case 1:
        totalPoints += 10;
      case 2:
        totalPoints += 5;
      case 3:
        totalPoints += 2;
      default:
        totalPoints += 1;
    }
  })

  return totalPoints;
}

export { calculatePoints };