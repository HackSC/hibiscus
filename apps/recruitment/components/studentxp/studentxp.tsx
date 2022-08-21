import styled from 'styled-components';

/* eslint-disable-next-line */
export interface StudentXPProps {}

const StyledStudentXP = styled.div`
  color: pink;
`;

export function StudentXP(props: StudentXPProps) {
  return (
    <StyledStudentXP>
      <h1>Welcome to Studentxp!</h1>
    </StyledStudentXP>
  );
}

export default StudentXP;
