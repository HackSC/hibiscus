import { GradientSpan, Text } from '@hibiscus/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TeamContactBlurbsProps {}

export function TeamContactBlurbs(props: TeamContactBlurbsProps) {
  return (
    <div>
      <GrayParagraph>
        <GrayBoldedSpan>Want to chat?</GrayBoldedSpan> Reach out to us at{' '}
        <TeamEmailGradientSpan>
          <GradientSpan>
            {' '}
            <a href="mailto:team@hacksc.com">team@hacksc.com</a>
          </GradientSpan>
        </TeamEmailGradientSpan>
        .
      </GrayParagraph>
      <GrayParagraph>
        <GrayBoldedSpan>Interested in sponsoring?</GrayBoldedSpan> Email{' '}
        <TeamEmailGradientSpan>
          <GradientSpan>
            {' '}
            <a href="mailto:sponsor@hacksc.com">sponsor@hacksc.com</a>
          </GradientSpan>
        </TeamEmailGradientSpan>
        !
      </GrayParagraph>
    </div>
  );
}

export default TeamContactBlurbs;

const GrayParagraph = styled(Text)`
  font-style: italic;
  font-weight: 300;
  color: #939393;
  margin: 10px 3px;
  font-size: 1.2rem;

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

const GrayBoldedSpan = styled.span`
  font-weight: 600;
`;

const TeamEmailGradientSpan = styled(GradientSpan)``;
