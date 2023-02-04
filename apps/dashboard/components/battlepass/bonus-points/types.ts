import { BonusPointsStatus } from '../../../common/apis/battlepass/types';

export interface BonusPointItem {
  id: string;
  points: number;
  title: string;
  description: string;
  status: BonusPointsStatus;
  link: string;
}
