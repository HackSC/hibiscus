import styled from 'styled-components';

/* eslint-disable-next-line */
export interface GlowSpanProps {
  color?: string;
  shadowColor?: string;
}

// defaults to white color
export const GlowSpan = styled.span<GlowSpanProps>`
  color: ${({ color }) => color ?? '#ffffff'};
  text-shadow: 0px 0px 10px ${({ shadowColor }) => shadowColor ?? '#ffffff'};
`;

export default GlowSpan;
