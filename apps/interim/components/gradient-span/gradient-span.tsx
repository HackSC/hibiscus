import { TrademarkColors } from '@hacksc-platforms/styles';
import styled from 'styled-components';

export const GradientSpan = styled.span({
  fontWeight: 700,
  background: `linear-gradient(to right, ${TrademarkColors.LIGHT_BLUE} 0%, ${TrademarkColors.LIGHT_PURPLE} 100%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export default GradientSpan;
