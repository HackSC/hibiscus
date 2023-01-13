import { LinkRepository } from '../../common/link.repository';
import { GetServerSideProps } from 'next';
import React from 'react';
import { container } from 'tsyringe';

function Index() {
  return (
    <div>
      <p>Redirecting you...</p>
    </div>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const linkRepo = container.resolve(LinkRepository);
  const shortlink = ctx.query.shortlink as string;
  const { data: link, error } = await linkRepo.getURL(shortlink);
  if (error) {
    console.error(error);
    return {
      redirect: {
        statusCode: 301,
        destination: 'https://hacksc.com',
      },
    };
  }
  return {
    redirect: {
      statusCode: 301,
      destination: link,
    },
  };
};
