import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TeamContactBlurbsProps {}

export function TeamContactBlurbs(props: TeamContactBlurbsProps) {
  return (
    <div>
      <GrayParagraph>
        <GrayBoldedItalicSpan>Want to chat?</GrayBoldedItalicSpan> Reach out to
        us at{' '}
        <span>
          <a href="mailto:team@hacksc.com">team@hacksc.com</a>.
        </span>
      </GrayParagraph>
      <GrayParagraph>
        <GrayBoldedItalicSpan>Interested in sponsoring?</GrayBoldedItalicSpan>{' '}
        Email{' '}
        <span>
          <a href="mailto:sponsor@hacksc.com">sponsor@hacksc.com</a>!
        </span>
      </GrayParagraph>
    </div>
  );
}

export default TeamContactBlurbs;

const GrayParagraph = styled.p`
  font-style: italic;
  color: #939393;
  margin: 3px;
`;

const GrayBoldedItalicSpan = styled.span`
  color: #939393;
  font-weight: 600;
`;
