import styled from 'styled-components';

/* eslint-disable-next-line */
export interface HackerManagerProps {}

const StyledHackerManager = styled.div`
  background-color: #d9d9d9;
  width: 70%;
`;

export function HackerManager(props: HackerManagerProps) {
  return (
    <StyledHackerManager>
      <Spreadsheet>
        <p>(Hacker tabular view)</p>
      </Spreadsheet>
    </StyledHackerManager>
  );
}

export default HackerManager;

const Spreadsheet = styled.div`
  background-color: black;
  width: 98%;
  height: 75%;
  margin: 100px auto;
  color: white;
`;
