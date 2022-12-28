import { H1, Link, Text } from '@hibiscus/ui';
import { GetServerSideProps } from 'next';
import { BeatLoader } from 'react-spinners';

/* eslint-disable-next-line */
export interface BusinesscardProps {}

const DEFAULT_BUSINESS_CARD_REDIRECT_URL = 'http://hacksc.com';

export function Businesscard(props: BusinesscardProps) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
      <BeatLoader />
      <H1 style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Redirecting you...
      </H1>
      <Text>
        Didn{"'"}t get redirected? Click{' '}
        <Link
          href={
            process.env.BUSINESS_CARD_REDIRECT_URL ??
            DEFAULT_BUSINESS_CARD_REDIRECT_URL
          }
        >
          here
        </Link>{' '}
        to go to the destination URL
      </Text>
    </div>
  );
}

export default Businesscard;

export const getServerSideProps: GetServerSideProps = async () => {
  const redirectURL = process.env.BUSINESS_CARD_REDIRECT_URL;
  return {
    redirect: {
      destination: redirectURL,
      permanent: false,
    },
  };
};
