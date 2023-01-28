import { Colors2023 } from '@hibiscus/styles';
import { Text, BoldText, Modal } from '@hibiscus/ui';
import { Button, Checkbox, Search } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import styled from 'styled-components';
import searchUser from '../../../common/search-user';

interface CheckInBoxProps {
  //   onClick: (value: string) => void;
}

export function CheckInBox() {
  const [isModalOpen, setModalOpen] = useState(true);
  const [isModal2Open, setModal2Open] = useState(false);
  function handleClick() {
    console.log('Button was clicked');
  }
  function handleAssign() {
    setModalOpen(false);
    setModal2Open(true);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <Container>
          <UpperDiv>
            <Name>Suhit Agarwal</Name>
            <InfoText>suhit@usc.edu</InfoText>
            <InfoText>(213)-513-4225</InfoText>
            <InfoText>Computer Science</InfoText>
          </UpperDiv>
          <LowerDiv>
            <LowerLeft>
              <SubHeader1>Verification</SubHeader1>
              <VerificationBox>
                <Checkbox
                  color="yellow"
                  label={'Admitted'}
                  onInput={handleClick}
                ></Checkbox>
                <Checkbox
                  color="yellow"
                  label={'Age'}
                  onInput={handleClick}
                ></Checkbox>
                <Checkbox
                  color="yellow"
                  label={'Status'}
                  onInput={handleClick}
                ></Checkbox>
              </VerificationBox>
            </LowerLeft>
            <LowerRight>
              <SubHeader2>Scan Wristband or</SubHeader2>
              <Search
                placeholder="Search by attendee name"
                onInput={handleAssign}
              ></Search>
              <Button color={'yellow'} onClick={handleAssign}>
                Assign
              </Button>
            </LowerRight>
          </LowerDiv>
        </Container>
      </Modal>
      <Modal isOpen={isModal2Open} closeModal={() => setModal2Open(false)}>
        <Container>
          <Name>Confirm</Name>
          <ConfirmText>
            Please confirm you would like to map wristband “0X5DG7” to Suhit
            Agarwal.
          </ConfirmText>
          <ButtonDiv>
            <Button color={'grey'}>CANCEL</Button>
            <Button color={'yellow'}>CONFIRM</Button>
          </ButtonDiv>
        </Container>
      </Modal>
    </>
  );
}
const ButtonDiv = styled.div`
  display: flex;
  gap: 27px;
  width: 100%;
  position: relative;
  top: 235px;
  justify-content: flex-end;
`;
const ConfirmText = styled.h2`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 42px;
  letter-spacing: -0.05em;
  font-feature-settings: 'cv05' on;
  color: #ffffff;
  width: 80%;
  position: relative;
  top: 100px;
  left: 60px;
`;
const SubHeader2 = styled.h2`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: -0.05em;
  font-feature-settings: 'cv05' on;

  /* yellow/light */

  color: #ffe89c;
`;
const SubHeader1 = styled.h2`
  /* position: relative; */
  width: 123px;
  height: 30px;
  /* left: 85px; */
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  letter-spacing: -0.05em;
  font-feature-settings: 'cv05' on;

  /* yellow/light */

  color: #ffe89c;
`;
const VerificationBox = styled.div`
  box-sizing: border-box;
  width: 302px;
  height: 156px;
  background: rgba(174, 140, 29, 0.15);
  border: 2.5px solid rgba(174, 140, 29, 0.35);
  border-radius: 7.93px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 20px;
  padding-left: 20px;
`;
const LowerLeft = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;
`;
const LowerRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;
`;
const InfoText = styled.p`
  font-family: 'Inter';
  font-style: italic;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: -0.05em;
  font-feature-settings: 'cv05' on;

  color: #ffffff;
  text-align: center;
`;

const Name = styled.h1`
  color: #ffe89c;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 45px;
  line-height: 54px;
  letter-spacing: -0.05em;
  font-feature-settings: 'cv05' on;
  text-shadow: 0px 0px 10px rgba(255, 232, 156, 0.5);
  text-align: center;
`;
const UpperDiv = styled.div`
  height: 50%;
`;
const LowerDiv = styled.div`
  height: 50%;
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 830px;
  height: 566px;

  padding: 1.5em 2.5em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;

  overflow-y: scroll;
`;
