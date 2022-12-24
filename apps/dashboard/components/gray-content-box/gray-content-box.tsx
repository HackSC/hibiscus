import { Colors2023 } from '@hacksc-platforms/styles';
import { H3 } from '@hacksc-platforms/ui';
import styled from 'styled-components';
import Image from 'next/image';

export interface GrayContentBoxProps extends React.PropsWithChildren {
  // title?: string;
  location: string;
}

export function GrayContentBox(props: GrayContentBoxProps) {
  return (
    <StyledGrayContentBox>
      <Image
        style={{ position: 'relative', bottom: 21, left: 30 }}
        width="40"
        height="40"
        src={props.location}
        alt=""
      />
      {/* <TitleHeading>{props.title?.toUpperCase()}</TitleHeading>
      {props.children} */}
    </StyledGrayContentBox>
  );
}

export default GrayContentBox;

const StyledGrayContentBox = styled.div`
  background-color: #5a5a5a;
  padding: 1rem 1.5rem;
  color: white;
  border: 1px solid ${Colors2023.BLUE.STANDARD};
  border-radius: 1rem;
  box-sizing: border-box;
  width: 150px;
  height: 130px;
  background: #363636;
  border: 2px solid #5a5a5a;
  /* smaller-red-glow */

  /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  /* margin: 0 15px 15px 15px; */
`;
