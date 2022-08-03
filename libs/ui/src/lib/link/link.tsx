import styled from 'styled-components';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

/* eslint-disable-next-line */
export type LinkProps = React.PropsWithChildren<NextLinkProps> & {
  anchorTagPropsOverride?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

const AnchorTag = styled.a`
  text-decoration: none;
`;

/**
 * A generic wrapper component around Next.js's SEO optimized Link component
 * - wraps around an `a` tag by default with `passHref`
 * - override props passed into `a` tag with `anchorTagPropsOverride` prop
 */
export function Link(props: LinkProps) {
  return (
    <NextLink {...props} passHref>
      <AnchorTag
        target={'_blank'}
        rel="noreferrer"
        {...props.anchorTagPropsOverride}
      >
        {props.children}
      </AnchorTag>
    </NextLink>
  );
}

export default Link;
