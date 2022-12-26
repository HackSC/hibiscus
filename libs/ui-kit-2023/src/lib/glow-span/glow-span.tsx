import styled from 'styled-components';

/* eslint-disable-next-line */
export interface GlowSpanProps {
  color?: string;
  shadowColor?: string;
}

// defaults to red color
export const GlowSpan = styled.span<GlowSpanProps>`
  color: ${({ color }) => color ?? '#ffa295'};
  text-shadow: 0px 0px 10px ${({ shadowColor }) => shadowColor ?? '#fe5139'};
`;

export default GlowSpan;
