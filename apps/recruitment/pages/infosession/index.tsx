import { GetServerSideProps } from 'next';

/* eslint-disable-next-line */
export interface InfoSessionRedirectProps {}

function InfoSessionRedirect(props: InfoSessionRedirectProps) {
  return <div className="main"></div>;
}

export default InfoSessionRedirect;

export const getServerSideProps: GetServerSideProps = async () => {
  const zoomInfoSessionURL = process.env.ZOOM_INFO_SESSION_URL;
  return {
    redirect: {
      destination: zoomInfoSessionURL,
      permanent: false,
    },
  };
};
