import { Colors2023 } from '@hibiscus/styles';
import styled from 'styled-components';

export const GrayBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  color: white;
  border: 1px solid ${Colors2023.BLUE.STANDARD};
  border-radius: 1rem;
  box-sizing: border-box;
  background: #363636;
  border: 2px solid #5a5a5a;
  border-radius: 10px;
  border-radius: 10px;
  border: 2px solid var(--Blue-Ivy, #002990);
  background: var(--Blue-Ivy, #002990);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
