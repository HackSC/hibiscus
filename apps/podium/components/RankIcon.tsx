import { FC } from 'react';
import * as styles from '../styles/index.css';

interface RankIconProps {
  rank: number | null;
}

const RankIcon: FC<RankIconProps> = ({ rank }) => {
  return (
    <div className={`${styles.rankIcon} ${styles.flexCenter}`}>
      {rank === null ? '-' : rank}
    </div>
  );
};

export default RankIcon;
