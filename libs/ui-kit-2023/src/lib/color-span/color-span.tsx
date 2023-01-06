import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ColorSpanProps {
  color?: string;
  weight?: number;
}

export const ColorSpan = styled.span<ColorSpanProps>`
  color: ${({ color }) => color ?? '#ffffff'};
`;

export const ColorSpanBold = styled.span<ColorSpanProps>`
  color: ${({ color }) => color ?? '#ffffff'};
  font-weight: 600;
  > a:link,
  a:visited,
  a:hover,
  a:active {
    color: ${({ color }) => color ?? '#ffffff'};
  }
`;

export default ColorSpan;
