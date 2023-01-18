import { GetStaticProps } from 'next';

export function Index() {
  return <p>Redirecting you...</p>;
}

export default Index;

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      statusCode: 301,
      destination: 'https://hacksc.com',
    },
  };
};
