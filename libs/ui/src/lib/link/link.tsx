import NextLink, { LinkProps as NextLinkProps } from 'next/link';

/* eslint-disable-next-line */
export type LinkProps = React.PropsWithChildren<NextLinkProps> & {
  underline?: boolean;
  anchortagpropsoverride?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
};

/**
 * A generic wrapper component around Next.js's SEO optimized Link component
 * - wraps around an `a` tag by default with `passHref`
 * - override props passed into `a` tag with `anchorTagPropsOverride` prop
 */
export function Link(props: LinkProps) {
  return (
    <NextLink
      {...props}
      style={{
        textDecoration: props.underline ? 'underline' : 'none',
        ...props.anchortagpropsoverride?.style,
      }}
      passHref
      target={'_blank'}
      rel="noreferrer"
      {...props.anchortagpropsoverride}
    >
      {props.children}
    </NextLink>
  );
}

export default Link;
