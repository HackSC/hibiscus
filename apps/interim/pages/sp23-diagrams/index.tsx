import { H1, Link, Text } from '@hibiscus/ui';
import { GetServerSideProps } from 'next';
import { BeatLoader } from 'react-spinners';

/* eslint-disable-next-line */
interface Props {}

export function SP23DiagramsRedirect(props: Props) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '1rem' }}>
      <BeatLoader />
      <H1 style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Redirecting you...
      </H1>
      <Text>
        Didn{"'"}t get redirected? Click{' '}
        <Link href={process.env.SP2023_DIAGRAMS}>here</Link> to go to the
        destination URL
      </Text>
    </div>
  );
}

export default SP23DiagramsRedirect;

export const getServerSideProps: GetServerSideProps = async () => {
  const redirectURL = process.env.SP2023_DIAGRAMS;
  return {
    redirect: {
      destination: redirectURL,
      permanent: false,
    },
  };
};
