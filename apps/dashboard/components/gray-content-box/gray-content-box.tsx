import { Colors2023 } from '@hacksc-platforms/styles';
import { H3 } from '@hacksc-platforms/ui';
import styled from 'styled-components';

export interface GrayContentBoxProps extends React.PropsWithChildren {
  title?: string;
}

export function GrayContentBox(props: GrayContentBoxProps) {
  return (
    <StyledGrayContentBox>
      <TitleHeading>{props.title?.toUpperCase()}</TitleHeading>
      {props.children}
    </StyledGrayContentBox>
  );
}

export default GrayContentBox;

const TitleHeading = styled(H3)`
  letter-spacing: 2px;
  font-weight: 500;
`;

const StyledGrayContentBox = styled.div`
  background-color: ${Colors2023.GRAY_MEDIUM};
  padding: 1rem 1.5rem;
  color: white;
  border: 1px solid ${Colors2023.BLUE_STANDARD};
  border-radius: 1rem;
`;
