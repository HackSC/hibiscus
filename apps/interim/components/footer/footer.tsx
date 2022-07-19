import styled from 'styled-components';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface FooterProps {}

const StyledFooter = styled.div`
  background-color: #f6f6f6;
  width: auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 0 16px;
`;

export function Footer(props: FooterProps) {
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
}

export default Footer;
