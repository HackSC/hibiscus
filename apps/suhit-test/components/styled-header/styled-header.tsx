import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StyledHeaderProps {}

const StyledStyledHeader = styled.div`
  color: blue;
  
`;

export function StyledHeader(props: StyledHeaderProps) {
  return (
    <StyledStyledHeader>
      <h1>Welcome to StyledHeader!</h1>
    </StyledStyledHeader>
  );
}

export default StyledHeader;
