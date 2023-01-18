import { GetServerSideProps } from 'next';

export function Index() {
  return <p>Redirecting you...</p>;
}

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      statusCode: 301,
      destination: 'https://hacksc.com',
    },
  };
};
