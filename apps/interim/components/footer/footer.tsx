import styled from 'styled-components';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <FooterWrapper>
      <SocialMediaContainer>
        <IconContainer>
          <a
            href="https://www.linkedin.com/company/hacksc/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              style={{ margin: 20 }}
              src="/linkedin.svg"
              alt="LinkedIn"
              height="35"
              width="35"
              layout="fixed"
            />
          </a>
        </IconContainer>
        <IconContainer>
          <a
            href="https://twitter.com/hackscofficial"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              style={{ margin: 20 }}
              src="/twitter.svg"
              alt="Twitter"
              height="35"
              width="35"
              layout="fixed"
            />
          </a>
        </IconContainer>
        <IconContainer>
          <a
            href="https://www.facebook.com/hackscofficial/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              style={{ margin: 20 }}
              src="/facebook.svg"
              alt="Facebook"
              height="35"
              width="35"
              layout="fixed"
            />
          </a>
        </IconContainer>
        <IconContainer>
          <a
            href="https://www.instagram.com/hackscofficial/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              style={{ margin: 20 }}
              src="/instagram.svg"
              alt="Instagram"
              height="35"
              width="35"
              layout="fixed"
            />
          </a>
        </IconContainer>
      </SocialMediaContainer>
    </FooterWrapper>
  );
}

export default Footer;

const FooterWrapper = styled.div`
  background-color: #f6f6f6;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
`;

const IconContainer = styled.div`
  padding: 0 0.5rem 0;
`;

const SocialMediaContainer = styled.div`
  display: flex;
`;
