import { H2, H3, Link } from '@hibiscus/ui';
import Image from 'next/image';
import React from 'react';

function AppsClosedPlaceholder() {
  return (
    <div>
      <Image
        src="/hackform-illustrations/postcard-plane.svg"
        width={100}
        height={100}
        alt="Postcard plane"
      />
      <H2>Apps for HackSC 2023 has closed!</H2>
      <H3>
        We have closed our apps for HackSC 2023, and will send emails to people
        who have applied soon! If you missed this year{"'"}s apps, we still have
        many more cool upcoming events. Make sure to stay up to date with HackSC
        through our{' '}
        <Link href="https://instagram.com/hackscofficial/" passHref underline>
          social media
        </Link>
      </H3>
      <br />
      <H3>We look forward to seeing you again 🌺</H3>
    </div>
  );
}

export default AppsClosedPlaceholder;
