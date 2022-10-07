import styled from 'styled-components';

/* eslint-disable-next-line */
export interface LoginCardProps {}

const StyledLoginCard = styled.div`
  color: black;
`;

export function LoginCard(props: LoginCardProps) {
  return (
    <StyledLoginCard>
      <h1>hello guys</h1>
    </StyledLoginCard>
  );
}

export default LoginCard;
