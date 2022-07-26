import { TrademarkColors } from '@hacksc-platforms/styles';
import { Text } from '@hacksc-platforms/ui';
import styled from 'styled-components';
import GradientSpan from '../../../../libs/ui/src/lib/gradient-span/gradient-span';

/* eslint-disable-next-line */
export interface TeamContactBlurbsProps {}

export function TeamContactBlurbs(props: TeamContactBlurbsProps) {
  return (
    <div>
      <GrayParagraph>
        <GrayBoldedItalicSpan>Want to chat?</GrayBoldedItalicSpan> Reach out to
        us at{' '}
        <TeamEmailGradientSpan>
          <EmailA href="mailto:team@hacksc.com">team@hacksc.com</EmailA>
        </TeamEmailGradientSpan>
        .
      </GrayParagraph>
      <GrayParagraph>
        <GrayBoldedItalicSpan>Interested in sponsoring?</GrayBoldedItalicSpan>{' '}
        Email{' '}
        <TeamEmailGradientSpan>
          <EmailA href="mailto:sponsor@hacksc.com">sponsor@hacksc.com</EmailA>
        </TeamEmailGradientSpan>
        !
      </GrayParagraph>
    </div>
  );
}

export default TeamContactBlurbs;

const GrayParagraph = styled(Text)`
  font-style: italic;
  color: #939393;
  margin: 3px;
  font-size: 1.5rem;
`;

const GrayBoldedItalicSpan = styled.span`
  color: #939393;
  font-weight: 600;
  font-size: 1.5rem;
  font-family: Inter, sans-serif;
`;

const TeamEmailGradientSpan = styled(GradientSpan)``;

// https://stackoverflow.com/questions/44147872/linear-gradient-underline-for-hyperlink
const EmailA = styled.a({
  display: 'inline',
  textDecoration: 'none',
  backgroundImage: `linear-gradient(transparent, transparent),linear-gradient(transparent, transparent),linear-gradient(to right, ${TrademarkColors.LIGHT_BLUE}, ${TrademarkColors.LIGHT_PURPLE})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 190%',
  backgroundSize: '100% 10px',
});
