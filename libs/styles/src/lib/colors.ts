import { HibiscusRole } from '@hibiscus/types';

export namespace TrademarkColors {
  export const LIGHT_PURPLE = 'rgba(215, 112, 199, 61%)';
  export const LIGHT_BLUE = '#86ADF2';
  export const LIGHT_RED = 'rgba(255, 108, 100, 32%)';
  export const YELLOW = 'rgba(255, 196, 53, 32%)';
}

export namespace Colors2023 {
  export const GRAY = {
    DARK: '#222222',
    STANDARD: '#313131',
    MEDIUM: '#565656',
    SCHEMDIUM: '#777777',
    SHLIGHT: '#979797',
    LIGHT: '#F4F4F4',
  };
  export const PURPLE = {
    DARK: '#4130A7',
    STANDARD: '#7A65FD',
    LIGHT: '#B5A9FF',
  };
  export const PINK = {
    DARK: '#8F209A',
    STANDARD: '#DB3FEB',
    LIGHT: '#EB93F4',
  };
  export const BLUE = {
    DARK: '#307C93',
    STANDARD: '#76D3EF',
    LIGHT: '#BFF0FF',
  };
  export const RED = {
    DARK: '#AF3322',
    STANDARD: '#FE5139',
    LIGHT: '#FFA295',
  };
  export const YELLOW = {
    DARK: '#AE8C1D',
    STANDARD: '#FFD23C',
    LIGHT: '#FFE89C',
  };
  export const GREEN = {
    DARK: '#6F9A28',
    STANDARD: '#C2FA67',
    LIGHT: '#E9FFC5',
  };
  export const roleColors = {
    [HibiscusRole.HACKER]: {
      light: BLUE.LIGHT,
      standard: BLUE.STANDARD,
    },
    [HibiscusRole.ADMIN]: {
      light: RED.LIGHT,
      standard: RED.STANDARD,
    },
    [HibiscusRole.SPONSOR]: {
      light: GREEN.LIGHT,
      standard: GREEN.STANDARD,
    },
    [HibiscusRole.VOLUNTEER]: {
      light: YELLOW.LIGHT,
      standard: YELLOW.STANDARD,
    },
    [HibiscusRole.JUDGE]: {
      light: BLUE.LIGHT,
      standard: BLUE.STANDARD,
    },
  };
}
