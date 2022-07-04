import { TrademarkColors } from '@hacksc-platforms/styles';
import FAQSection from '../components/faqsection/faqsection';
import TeamContactBlurbs from '../components/team-contact-blurbs/team-contact-blurbs';
import ThankYouText from '../components/thank-you-text/thank-you-text';
import styled from 'styled-components';

export function Index() {
  const submitSubscribeNewsletterHandler = () => {
    alert("Subscribed to HackSC newsletter; what's next?");
  };

  return (
    <MainPageContainer>
      <div>
        <h1
          style={{
            fontWeight: 700,
            letterSpacing: -3,
            fontSize: 70,
            marginBottom: -10,
            marginTop: -10,
          }}
        >
          HackSC
        </h1>
        <h2
          style={{
            fontWeight: 300,
            color: '#939393',
            fontStyle: 'italic',
            fontSize: 20,
          }}
        >
          Southern California{`'`}s Flagship Hackathon
        </h2>
        <ThankYouText nextYear={2023} />
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <input
            style={{
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
            }}
            placeholder={'Subscribe to our email newsletter!'}
          />
          <button
            style={{
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
            }}
            onClick={submitSubscribeNewsletterHandler}
          >
            STAY UP TO DATE
          </button>
        </div>
      </div>
      <TeamContactBlurbs />
      <div style={{ marginTop: '2rem' }}>
        <FAQSection />
      </div>
    </MainPageContainer>
  );
}

export default Index;

const MainPageContainer = styled.div`
  width: 30rem;
`;
