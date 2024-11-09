import { getEnv } from '@hibiscus/env';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Colors2023 } from '@hibiscus/styles';
import { Modal } from '@hibiscus/ui';
import { Button, Checkbox, OneLineText, Search } from '@hibiscus/ui-kit-2023';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
  const [discordVerified, setDiscordVerified] = useState(false);
  const [waiver, setWaiver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { supabase } = useHibiscusSupabase();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user != null) {
      // checkDiscord(user.id).then((v) => setDiscordVerified(v));
      setWaiver(user.waiver_signed);
      setAdmitted(user.application_state === 5);
    }
  }, [user]);

  const handleClick = (setter: (value: boolean) => void) => (value: boolean) =>
    setter(value);

  function handleAssign() {
    if (isReady()) {
      setModalScreen(ModalScreen.CONFIRM);
    }
  }

  async function checkDiscord(userId: string): Promise<boolean> {
    try {
      const res = await axios.get(
        `${getEnv().Hibiscus.Discord.ApiUrl}/checkUserIsVerified/${userId}`
      );

      return res.data.verified;
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function handleConfirm() {
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
  }

  function isReady() {
    return discordVerified && waiver;
  }

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      {modalScreen === ModalScreen.ASSIGN ? (
        <div className="flex flex-row justify-between bg-white border-[1px] border-black border-solid rounded-[8px] p-[50px] w-[700px] h-[400px]">
          <div className="flex flex-col">
            <h2 className="text-3xl m-0">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-xs text-gray-500">{user.email}</p>
            <br />
            <p className="text-xs font-bold mb-[5px]">{user.school}</p>
            <p className="text-xs font-bold">{user.major}</p>

            <div className="flex flex-col gap-[10px] mt-[64px]">
              <h2 className="m-0 text-xl text-theme-redward">Scan Wristband</h2>
              <Search
                placeholder="ID number"
                externalRef={(element) => {
                  inputRef.current = element;
                }}
                onInput={() => {
                  return;
                }}
              />
              <button
                onClick={() => {
                  setWristbandId(inputRef.current.value);
                  handleAssign();
                }}
                disabled={!(admitted && waiver && discordVerified)}
                className="w-fit bg-red-300 hover:bg-theme-redward disabled:bg-gray-300 border-black border-[1px] border-solid rounded-[8px] text-xs px-[12px] py-[8px]"
              >
                Assign Band
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <h2 className="m-0 text-xl text-theme-redward">Verification</h2>
            <div className="border-black border-[1px] rounded-[13px] p-[40px] flex flex-col gap-[30px]">
              <Checkbox
                color="yellow"
                label="Admitted"
                checked={admitted}
                onInput={handleClick(setAdmitted)}
              />
              <Checkbox
                color="yellow"
                label="Signed Waiver"
                checked={waiver}
                onInput={handleClick(setWaiver)}
              />
              <Checkbox
                color="yellow"
                label="Joined Discord"
                checked={discordVerified}
                onInput={handleClick(setDiscordVerified)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-[20px] bg-white border-[1px] border-black border-solid rounded-[8px] w-[700px] h-[400px]">
          <h2 className="text-2xl m-0">Confirm</h2>
          <p className="text-sm">
            Please confirm you would like to map wristband &quot;{wristbandId}
            &quot; to {user.first_name} {user.last_name}.{'\n'}
            <span style={{ color: Colors2023.RED.STANDARD }}>
              {errorMessage}
            </span>
          </p>
          <div className="flex flex-row gap-[20px]">
            <button
              onClick={closeModal}
              className="w-fit bg-white hover:bg-gray-300 border-black border-[1px] border-solid rounded-[8px] text-xs px-[12px] py-[8px]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="w-fit bg-lime-200 hover:bg-lime-400 border-black border-[1px] border-solid rounded-[8px] text-xs px-[20px] py-[8px]"
            >
              Confirm
            </button>
          </div>
        </div>
        // <Container>
        //   <Name>Confirm</Name>
        //   <ConfirmText>
        //     Please confirm you would like to map wristband “{wristbandId}” to{' '}
        //     {user.first_name} {user.last_name}.{'\n'}
        //     <span style={{ color: Colors2023.RED.STANDARD }}>
        //       {errorMessage}
        //     </span>
        //   </ConfirmText>
        //   <ButtonDiv>
        //     <Button color="grey" onClick={closeModal}>
        //       CANCEL
        //     </Button>
        //     <Button color="yellow" onClick={handleConfirm}>
        //       CONFIRM
        //     </Button>
        //   </ButtonDiv>
        // </Container>
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
