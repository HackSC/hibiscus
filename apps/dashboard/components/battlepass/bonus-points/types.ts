export interface BonusPointItem {
  points: number;
  title: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'VERIFY';
}
