import { Colors2023 } from '@hibiscus/styles';
import { Text, Link, LinkProps } from '@hibiscus/ui';
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
  font-size: 16px;
  font-family: "Hanken Grotesk";
  text-decoration: underline;
  color: #000000;
  font-weight: 300;
  margin-top: 6px;
`;
