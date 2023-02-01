import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import { Colors2023 } from '@hibiscus/styles';
import { Modal, Text } from '@hibiscus/ui';
import { Button, Checkbox, OneLineText, Search } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import styled from 'styled-components';
import { container } from 'tsyringe';

interface CheckInBoxProps {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  user: any;
}

enum ModalScreen {
  ASSIGN,
  CONFIRM,
}

export function CheckInBox(props: CheckInBoxProps) {
  const { isModalOpen, setModalOpen, user } = props;
  const [modalScreen, setModalScreen] = useState(ModalScreen.ASSIGN);
  const [wristbandId, setWristbandId] = useState(null);
  const [admitted, setAdmitted] = useState(false);
  const [age, setAge] = useState(false);
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = (setter: (value: boolean) => void) => (value: boolean) =>
    setter(value);

  function handleAssign() {
    if (isReady()) {
      setModalScreen(ModalScreen.CONFIRM);
    }
  }

  async function handleConfirm() {
    const supabase = container.resolve(HibiscusSupabaseClient);
    let { error } = await supabase
      .getClient()
      .from('participants')
      .update({ wristband_id: wristbandId })
      .eq('id', user.user_id);

    if (error == null) {
      const res = await supabase
        .getClient()
        .from('leaderboard')
        .upsert({ user_id: user.user_id }, { ignoreDuplicates: true });
      error = res.error;

      if (error == null) {
        window.location.reload();
        return;
      }
    }

    setErrorMessage(error.message);
  }

  function closeModal() {
    setModalOpen(false);
    setModalScreen(ModalScreen.ASSIGN);
    setWristbandId(null);
    setAdmitted(false);
    setAge(false);
    setStatus(false);
  }

  function isReady() {
    return admitted && age && status;
  }

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {modalScreen === ModalScreen.ASSIGN ? (
        <Container>
          <UpperDiv>
            <Name>
              {user.first_name} {user.last_name}
            </Name>
            <InfoText>{user.email}</InfoText>
            <InfoText>{user.major}</InfoText>
          </UpperDiv>
          <LowerDiv>
            <LowerLeft>
              <SubHeader1>Verification</SubHeader1>
              <VerificationBox>
                <Checkbox
                  color="yellow"
                  label="Admitted"
                  onInput={handleClick(setAdmitted)}
                />
                <Checkbox
                  color="yellow"
                  label="Age"
                  onInput={handleClick(setAge)}
                />
                <Checkbox
                  color="yellow"
                  label="Education Status"
                  onInput={handleClick(setStatus)}
                />
              </VerificationBox>
            </LowerLeft>
            <LowerRight onSubmit={handleAssign}>
              <SubHeader2>Scan Wristband</SubHeader2>
              <OneLineText
                placeholder="ID number"
                value={wristbandId}
                onChange={(e) => setWristbandId(e.target.value)}
              ></OneLineText>
              <Button color="yellow" disabled={!isReady()}>
                Assign
              </Button>
            </LowerRight>
          </LowerDiv>
        </Container>
      ) : (
        <Container>
          <Name>Confirm</Name>
          <ConfirmText>
            Please confirm you would like to map wristband “{wristbandId}” to{' '}
            {user.first_name} {user.last_name}.{'\n'}
            <span style={{ color: Colors2023.RED.STANDARD }}>
              {errorMessage}
            </span>
          </ConfirmText>
          <ButtonDiv>
            <Button color="grey" onClick={closeModal}>
              CANCEL
            </Button>
            <Button color="yellow" onClick={handleConfirm}>
              CONFIRM
            </Button>
          </ButtonDiv>
        </Container>
      )}
    </Modal>
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
const LowerRight = styled.form`
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
