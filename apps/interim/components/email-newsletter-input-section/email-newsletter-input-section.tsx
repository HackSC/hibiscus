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

const Container = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  marginBottom: '2rem',
});

const GradientButton = styled.button({
  background: `linear-gradient(90deg, ${TrademarkColors.LIGHT_BLUE} 0%, ${TrademarkColors.LIGHT_PURPLE} 100%)`,
  border: 'none',
  padding: '12px 2px',
  color: 'white',
  fontWeight: 700,
  borderRadius: 10,
  boxShadow: '0px 2px 10px -1px #a0a0a0',
  fontSize: 15,
  cursor: 'pointer',
  minWidth: '30%',
});

const EmailInput = styled.input({
  border: 'solid 0.1rem #BCBCBC',
  backgroundColor: '#F8F8F8',
  borderRadius: 10,
  padding: 10,
  paddingLeft: 15,
  fontSize: 15,
  color: '#676767',
  marginRight: 5,
  maxWidth: '100%',
  width: '100%',
});
