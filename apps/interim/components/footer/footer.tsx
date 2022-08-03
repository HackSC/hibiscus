import { Link } from '@hacksc-platforms/ui';
import Image from 'next/image';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  const socialMedias: { href: string; src: string; alt: string }[] = [
    {
      src: '/img/linkedin.svg',
      alt: 'LinkedIn',
      href: 'https://www.linkedin.com/company/hacksc/',
    },
    {
      src: '/img/twitter.svg',
      alt: 'Twitter',
      href: 'https://twitter.com/hackscofficial',
    },
    {
      src: '/img/facebook.svg',
      alt: 'Facebook',
      href: 'https://www.facebook.com/hackscofficial/',
    },
    {
      src: '/img/instagram.svg',
      alt: 'Instagram',
      href: 'https://www.instagram.com/hackscofficial/',
    },
  ];

  return (
    <FooterWrapper>
      <SocialMediaContainer>
        {socialMedias.map(({ href, src, alt }) => (
          <IconContainer key={alt}>
            <Link href={href}>
              <Image src={src} alt={alt} layout="fill" />
            </Link>
          </IconContainer>
        ))}
      </SocialMediaContainer>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  background-color: #f6f6f6;
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

  @media (max-width: 425px) {
    width: 1rem;
    height: 1rem;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
`;
