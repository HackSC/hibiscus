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
  font-size: 1rem;
  color: ${Colors2023.GRAY.LIGHT};
  text-decoration: underline;
`;
