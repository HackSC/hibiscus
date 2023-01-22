import { Link } from '@hibiscus/ui';
import Image from 'next/image';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { ColorSpanBold } from '@hibiscus/ui-kit-2023';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  const socialMedias: { href: string; src: string; alt: string }[] = [
    {
      src: '/img/logos/linkedin.svg',
      alt: 'LinkedIn',
      href: 'https://www.linkedin.com/company/hacksc/',
    },
    {
      src: '/img/logos/twitter.svg',
      alt: 'Twitter',
      href: 'https://twitter.com/hackscofficial',
    },
    {
      src: '/img/logos/facebook.svg',
      alt: 'Facebook',
      href: 'https://www.facebook.com/hackscofficial/',
    },
    {
      src: '/img/logos/instagram.svg',
      alt: 'Instagram',
      href: 'https://www.instagram.com/hackscofficial/',
    },
    {
      src: '/img/logos/mail.svg',
      alt: 'Email',
      href: 'mailto:team@hacksc.com',
    },
  ];
  const accessible: { href: string; src: string; alt: string }[] = [
    {
      src: '/img/logos/accessibility.svg',
      alt: 'Accessibility Notice',
      href: 'https://www.notion.so/hacksc23/Accessibility-Statement-0122349b14794a5bb3397c487316d1cb',
    },
  ];
  const Vercel: { href: string; src: string; alt: string }[] = [
    {
      src: '/img/logos/vercel.svg',
      alt: 'Vercel',
      href: 'https://www.vercel.com/?utm_source=hacksc&utm_campaign=oss',
    },
  ];

  return (
    <FooterWrapper>
      <SocialMediaContainer>
        {accessible.map(({ href, src, alt }) => (
          <IconContainer key={alt}>
            <Link href={href}>
              <Image src={src} alt={alt} fill />
            </Link>
          </IconContainer>
        ))}
        <ColorSpanBold color={Colors2023.GRAY.LIGHT}>
          <Link href="https://www.notion.so/hacksc23/Accessibility-Statement-0122349b14794a5bb3397c487316d1cb">
            Accessibility Notice
          </Link>
        </ColorSpanBold>
      </SocialMediaContainer>
      <SocialMediaContainer>
        {socialMedias.map(({ href, src, alt }) => (
          <IconContainer key={alt}>
            <Link href={href}>
              <Image src={src} alt={alt} fill />
            </Link>
          </IconContainer>
        ))}
      </SocialMediaContainer>
      {Vercel.map(({ href, src, alt }) => (
        <IconContainerV key={alt}>
          <Link href={href}>
            <Image src={src} alt={alt} fill />
          </Link>
        </IconContainerV>
      ))}
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  background-color: ${Colors2023.GRAY.MEDIUM};
  justify-content: space-around;
  align-items: center;
  padding: 2rem;
`;

const IconContainer = styled.div`
  position: relative;
  width: 1.2rem;
  height: 1.2rem;
  padding: 1rem 1rem 0;
  margin: 0 1rem;
  transition: ease-in-out 0.1s;

  &:hover {
    transform: scale(1.2);
  }

  @media screen and (max-width: 425px) {
    padding-top: 0.25rem;
    padding-left: 0.5rem;
    margin-left: 0.25rem;
    width: 5vw;
    height: 5vw;
  }
`;

const IconContainerV = styled.div`
  position: relative;
  width: 4rem;
  height: 2rem;
  padding: 3rem 4rem 0;
  margin: 0 1rem;
  transition: ease-in-out 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 425px) {
    padding-top: 0.5rem;
    padding-left: 1rem;
    margin-left: 0.25rem;
    width: 2rem;
    height: 2rem;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
