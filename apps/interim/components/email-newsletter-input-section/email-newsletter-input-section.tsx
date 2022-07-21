import { TrademarkColors } from '@hacksc-platforms/styles';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface EmailNewsletterInputSectionProps {}

export function EmailNewsletterInputSection(
  props: EmailNewsletterInputSectionProps
) {
  const submitSubscribeNewsletterHandler = () => {
    alert("Subscribed to HackSC newsletter; what's next?");
  };

  return (
    <Container>
      <EmailInput placeholder={'Subscribe to our email newsletter!'} />
      <GradientButton onClick={submitSubscribeNewsletterHandler}>
        STAY UP TO DATE
      </GradientButton>
    </Container>
  );
}

export default EmailNewsletterInputSection;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const GradientButton = styled.button`
  background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  border: none;
  padding: 12px 2px;
  color: white;
  font-weight: 900;
  border-radius: 10px;
  box-shadow: 0px 2px 10px -1px #a0a0a0;
  font-size: 15;
  cursor: pointer;
  min-width: 30%;

  @media (max-width: 600px) {
    width: 100%;
    margin-top: 5px;
  }
`;

const EmailInput = styled.input({
  border: 'solid 0.1rem #BCBCBC',
  backgroundColor: '#F8F8F8',
  borderRadius: 10,
  padding: 10,
  paddingLeft: 15,
  fontFamily: 'Inter',
  fontSize: 15,
  color: '#676767',
  marginRight: 5,
  maxWidth: '100%',
  width: '100%',
});
