import { Colors2023 } from '@hibiscus/styles';
import { HibiscusRole } from '@hibiscus/types';

export const getColorsForRole = (role: HibiscusRole) => {
  return Colors2023.roleColors[role];
};
