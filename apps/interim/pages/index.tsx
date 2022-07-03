import { TrademarkColors } from '@hacksc-platforms/styles';
import ThankYouText from '../components/thank-you-text/thank-you-text';

export function Index() {
  const submitSubscribeNewsletterHandler = () => {
    alert("Subscribed to HackSC newsletter; what's next?");
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '30rem',
      }}
    >
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
            placeholder={'SAMPLE@EMAIL.EDU'}
          />
          <button
            style={{
              background: `linear-gradient(90deg, ${TrademarkColors.LIGHT_BLUE} 0%, ${TrademarkColors.LIGHT_PURPLE} 100%)`,
              border: 'none',
              paddingTop: 12,
              paddingBottom: 12,
              color: 'white',
              fontWeight: 900,
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
      <div></div>
    </div>
  );
}

export default Index;
