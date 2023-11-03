import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles'; // Replace with the actual import path

export const StyledAuthCard = styled.div`
  min-width: 35vw;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  align-items: center;
  border-radius: 20px;
  min-height: 55vh;
  > h3 {
    text-align: center;
  }
  border: 4px solid ${Colors2023.BLUE.STANDARD};
  box-shadow: 0px 0px 10px ${Colors2023.BLUE.LIGHT};
`;
