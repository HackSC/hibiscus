import { TrademarkColors } from '@hacksc-platforms/styles';
import styled from 'styled-components';

export const GradientSpan = styled.span`
  background: linear-gradient(
    to right,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  font-family: Inter, sans-serif;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

export default GradientSpan;
