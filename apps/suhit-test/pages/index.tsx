import styled from 'styled-components';
import StyledHeader from '../components/styled-header/styled-header';
const StyledPage = styled.div`
  color: black;
`;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <StyledHeader/>
    </StyledPage>
  );
}

export default Index;
