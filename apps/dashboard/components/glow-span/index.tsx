import styled from 'styled-components';

export interface GlowSpanProps {
  color?: string;
  shadowColor?: string;
}

// defaults to red color
const GlowSpan = styled.span<GlowSpanProps>`
  color: ${({ color }) => color ?? '#ffa295'};
  text-shadow: 0px 0px 15px ${({ shadowColor }) => shadowColor ?? '#fe5139'};
`;

export default GlowSpan;
