import { Text, Link, LinkProps } from '@hacksc-platforms/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface GrayLinkProps extends LinkProps {}

export function GrayLink(props: GrayLinkProps) {
  return (
    <Link {...props} anchortagpropsoverride={{ target: '_self' }}>
      <StyledText>{props.children}</StyledText>
    </Link>
  );
}

export default GrayLink;

const StyledText = styled(Text)`
  font-size: 1rem;
  color: #939393;
  text-decoration: underline;
`;
