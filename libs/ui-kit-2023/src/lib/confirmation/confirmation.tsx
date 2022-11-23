import styled from 'styled-components';
import BlueButton from '../blue-button/blue-button';

export function Confirmation() {
  return (
    <StyledConfirmation>
      <InnerDivTop>
        <Div>
          <HeadText>Are you sure?</HeadText>
          <Close>&times;</Close>
        </Div>
        <SubText>This action can‘t be undone.</SubText>
      </InnerDivTop>
      <InnerDivBottom>
        <CancelText>CANCEL</CancelText>
        <BlueButton label="CONFIRM"></BlueButton>
      </InnerDivBottom>
    </StyledConfirmation>
  );
}
export default Confirmation;
const Close = styled.button`
  all: unset;
  cursor: pointer;
  font-weight: bold;
  color: #565656;
  font-size: 25px;
`;
const CancelText = styled.button`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  border: none;
  color: #f4f4f4;
  position: relative;
`;

const InnerDivTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* border: 1px solid red; */
`;

const InnerDivBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 50px;
`;
const Div = styled.div`
  width: 100%;
  /* border: solid 1px red; */
  display: flex;
  justify-content: space-between;
`;

const HeadText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 26.5462px;
  line-height: 37px;
  /* identical to box height, or 141% */

  display: flex;
  align-items: center;

  color: #f4f4f4;

  margin: 0;
`;
const SubText = styled.p`
  width: 100%;
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 20.3px;
  line-height: 31px;
  /* identical to box height, or 154% */

  display: flex;
  align-items: center;
  color: #f4f4f4;
`;

const StyledConfirmation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24.9846px;

  width: 555px;
  height: 170px;
  font-family: 'Inter';

  /* gray/standard */

  background: #313131;
  /* gray/light */

  border: 3.12308px solid #f4f4f4;
  border-radius: 17px;

  /* Inside auto layout */

  /* flex: none;
    order: 0;
    flex-grow: 0; */
`;
