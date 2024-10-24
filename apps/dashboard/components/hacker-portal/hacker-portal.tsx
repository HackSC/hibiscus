import styled from 'styled-components';
import { H2, Link, Modal, Text } from '@hibiscus/ui';
import { Button, GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import { HibiscusRole } from '@hibiscus/types';
import { H1, H3 } from '@hibiscus/ui';
import { ApplicationStatus } from '@hibiscus/types';
import { SVGProps, useState } from 'react';
import RSVPForm from '../rsvp-form/rsvp-form';
import { ComingSoon } from './coming-soon';
import { getColorsForRole } from '../../common/role.utils';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { GrayBox } from '../gray-box/gray-box';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import DeclinedPlaceholder from './declined-placeholder';
import { CongratsMessage } from './congrats-message';
import { RejectionMessage } from './rejection-message';
import BattlepassPage from '../battlepass/battlepass-page';
import { BattlepassAPIProvider } from '../../hooks/use-battlepass-api/use-battlepass-api';
import ConfirmedPlaceholder from './confirmed-placeholder';
import { useRouter } from 'next/router';
import HackSCGuy from '../svg/hacksc-guy';

type RSVPChoice = 'DECLINE' | 'ACCEPT';

interface HackerPortalProps {
  isEventOpen: boolean;
  appsOpen: boolean;
}

export function HackerPortal({ isEventOpen, appsOpen }: HackerPortalProps) {
  // const [modalOpen, setModalOpen] = useState(false);
  // const { user, updateUser } = useHibiscusUser();
  // const closeModal = () => setModalOpen(false);
  // const userColors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);
  // const [choice, setChoice] = useState<RSVPChoice | null>(null);
  // const { supabase: hbc } = useHibiscusSupabase();
  // const client = hbc.getClient();
  // const router = useRouter();
  // const WelcomeHeader = () => (
  //   <div
  //     style={{
  //       display: 'inline-flex',
  //       width: '100%',
  //       justifyContent: 'space-between',
  //       alignItems: 'center',
  //     }}
  //   >
  //     <WelcomeContainer>
  //       <H1
  //         style={{
  //           color: userColors.light,
  //           fontSize: '30px',
  //           textShadow: `0px 0px 10px ${userColors.standard}`,
  //         }}
  //       >
  //         Welcome, {user.firstName}
  //       </H1>
  //       <H3 style={{ color: '#989898' }}>What would you like to do today?</H3>
  //     </WelcomeContainer>
  //   </div>
  // );
  // const getApplicationStatus = () => {
  //   return (
  //     <span
  //       style={{
  //         backgroundColor:
  //           (user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
  //             Colors2023.GRAY.DARK) ||
  //           (user.applicationStatus === ApplicationStatus.STARTED &&
  //             Colors2023.YELLOW.DARK) ||
  //           (user.applicationStatus === ApplicationStatus.ADMITTED &&
  //             Colors2023.GREEN.DARK) ||
  //           (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
  //             Colors2023.RED.DARK) ||
  //           (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
  //             Colors2023.BLUE.DARK),
  //         color:
  //           (user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
  //             Colors2023.GRAY.LIGHT) ||
  //           (user.applicationStatus === ApplicationStatus.STARTED &&
  //             Colors2023.YELLOW.LIGHT) ||
  //           (user.applicationStatus === ApplicationStatus.ADMITTED &&
  //             Colors2023.GREEN.LIGHT) ||
  //           (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
  //             Colors2023.RED.LIGHT) ||
  //           (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
  //             Colors2023.BLUE.LIGHT),
  //         fontWeight: 500,
  //         padding: 8,
  //         borderRadius: 8,
  //         fontSize: '15px',
  //       }}
  //     >
  //       {(user.applicationStatus === ApplicationStatus.NOT_APPLIED &&
  //         'Not Applied') ||
  //         (user.applicationStatus === ApplicationStatus.STARTED &&
  //           'Application Started') ||
  //         (user.applicationStatus === ApplicationStatus.ADMITTED &&
  //           'Admitted') ||
  //         (user.applicationStatus === ApplicationStatus.NOT_ADMITTED &&
  //           'Not Admitted') ||
  //         (user.applicationStatus === ApplicationStatus.IN_REVIEW &&
  //           'In Review')}
  //     </span>
  //   );
  // };
  // const renderApplyMessage = () => {
  //   if (user.applicationStatus === ApplicationStatus.NOT_APPLIED) {
  //     return (
  //       <BannerContainer>
  //         <GlowSpan
  //           color={Colors2023.GRAY.LIGHT}
  //           shadowColor={Colors2023.BLUE.STANDARD}
  //           style={{ fontSize: 20 }}
  //         >
  //           {appsOpen
  //             ? 'You have not applied to HackSC X yet!'
  //             : 'Applications for HackSC X has closed'}
  //         </GlowSpan>
  //         <ApplyButton>
  //           <Link
  //             href="/apply-2023-x"
  //             anchortagpropsoverride={{ target: '_self' }}
  //           >
  //             {appsOpen ? 'Apply now' : 'Join the waitlist'}
  //           </Link>
  //         </ApplyButton>
  //       </BannerContainer>
  //     );
  //   }
  // };
  // const RSVPPlaceholder = () => {
  //   return (
  //     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  //       <CongratsMessage />
  //       <div style={{ display: 'flex', gap: '10px' }}>
  //         <Button
  //           color="red"
  //           onClick={() => {
  //             setChoice('DECLINE');
  //             setModalOpen(true);
  //           }}
  //         >
  //           DECLINE YOUR SPOT
  //         </Button>
  //         <Button
  //           color="black"
  //           onClick={() => {
  //             setChoice('ACCEPT');
  //             setModalOpen(true);
  //           }}
  //         >
  //           CONFIRM YOUR SPOT
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // };
  // const DeclineSpotContent = () => (
  //   <GrayBox
  //     style={{
  //       maxWidth: '30rem',
  //       display: 'flex',
  //       flexDirection: 'column',
  //       gap: '20px',
  //     }}
  //   >
  //     <div>
  //       <H2>Are you sure?</H2>
  //       <Text>
  //         Once submitted, you confirm that you will not be able to join HackSC
  //         X. This action is irreversible.
  //       </Text>
  //     </div>
  //     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //       <Button
  //         color="red"
  //         onClick={async (e) => {
  //           e.stopPropagation();
  //           setModalOpen(false);
  //           await client
  //             .from('user_profiles')
  //             .update({ attendance_confirmed: false })
  //             .eq('user_id', user.id);
  //           updateUser({ attendanceConfirmed: false });
  //         }}
  //       >
  //         CONFIRM
  //       </Button>
  //     </div>
  //   </GrayBox>
  // );
  // if (user.attendanceConfirmed === true) {
  //   if (isEventOpen === null) {
  //     return <></>;
  //   } else if (isEventOpen) {
  //     router.push('/leaderboard');
  //     return <></>;
  //   } else {
  //     return <ConfirmedPlaceholder />;
  //   }
  // } else if (user.attendanceConfirmed === false) {
  //   return <DeclinedPlaceholder />;
  // }
  // return (
  //   <>
  //     <WelcomeHeader />
  //     {renderApplyMessage()}
  //     <div
  //       style={{
  //         display: 'flex',
  //         backgroundColor: '#3b3b3b',
  //         padding: 20,
  //         borderRadius: 10,
  //         marginTop: 20,
  //         boxShadow: `0px 0px 5px #8e8e8e`,
  //       }}
  //     >
  //       <GlowSpan color={Colors2023.GRAY.LIGHT} style={{ fontSize: 20 }}>
  //         Your Application Status: {getApplicationStatus()}
  //       </GlowSpan>
  //     </div>
  //     <MessageContainer>
  //       {user.applicationStatus === ApplicationStatus.ADMITTED ? (
  //         <>
  //           <Modal isOpen={modalOpen} closeModal={closeModal}>
  //             {choice === 'ACCEPT' && <RSVPForm closeModal={closeModal} />}
  //             {choice === 'DECLINE' && <DeclineSpotContent />}
  //           </Modal>
  //           <RSVPPlaceholder />
  //         </>
  //       ) : user.applicationStatus === ApplicationStatus.NOT_ADMITTED ? (
  //         <RejectionMessage />
  //       ) : (
  //         <ComingSoon />
  //       )}
  //     </MessageContainer>
  //   </>
  // );

  const [modalOpen, setModalOpen] = useState(false);
  const { user, updateUser } = useHibiscusUser();
  const closeModal = () => setModalOpen(false);
  const [choice, setChoice] = useState<RSVPChoice | null>(null);
  const { supabase: hbc } = useHibiscusSupabase();
  const client = hbc.getClient();

  const DeclineSpotContent = () => (
    <GrayBox
      style={{
        maxWidth: '30rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'white',
        color: '#ff6347',
        borderColor: '#ffb1a3',
      }}
    >
      <div>
        <H2>Are you sure?</H2>
        <Text>
          Once submitted, you confirm that you will not be able to join SoCal
          Tech Week. This action is irreversible.
        </Text>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <RedButton
          color="red"
          onClick={async (e) => {
            e.stopPropagation();
            setModalOpen(false);
            await client
              .from('user_profiles')
              .update({ attendance_confirmed: false })
              .eq('user_id', user.id);
            updateUser({ attendanceConfirmed: false });
          }}
        >
          CONFIRM
        </RedButton>
      </div>
    </GrayBox>
  );

  if (user === null) {
    return (
      <Container>
        <CenterContainer>
          <Heading3>Loading...</Heading3>
        </CenterContainer>
      </Container>
    );
  }

  if (user.applicationId === undefined || user.applicationId === null) {
    return (
      <Container>
        <Stars>
          <StarTop style={{ position: 'absolute', top: -150, zIndex: -1 }} />
          <StarBottom
            style={{ position: 'absolute', right: 0, bottom: 0, zIndex: -1 }}
          />
        </Stars>
        <CenterContainer>
          <Heading>HackSC 2024 Application</Heading>
          <TextBody>
            Ready for another fun year of hacking? Join us at our SoCal Tech
            Week 24 hour hackathon!
          </TextBody>

          <HackSCGuy style={{ marginBottom: -30, zIndex: 1, marginTop: 30 }} />
          <Link
            href={'/apply-2024'}
            passHref
            anchortagpropsoverride={{ target: '_self' }}
          >
            <RedButton>Start Application</RedButton>
          </Link>
        </CenterContainer>
      </Container>
    );
  }

  if (user.applicationStatus == ApplicationStatus.IN_REVIEW) {
    return (
      <Container>
        <CenterContainer>
          <HackSCGuy />
          <Heading3>
            Your application has been submitted! Our team is currently reviewing
            applications and will be sending out the acceptances in phases after
            the application period closes.
          </Heading3>
        </CenterContainer>
      </Container>
    );
  }

  if (
    user.applicationStatus == ApplicationStatus.ADMITTED &&
    user.attendanceConfirmed == null
  ) {
    return (
      <Container>
        <CenterContainer>
          <CongratsMessage />
          <div style={{ display: 'flex', gap: '10px' }}>
            <RedButton
              onClick={() => {
                setChoice('DECLINE');
                setModalOpen(true);
              }}
            >
              DECLINE YOUR SPOT
            </RedButton>
            <GreenButton
              onClick={() => {
                setChoice('ACCEPT');
                setModalOpen(true);
              }}
            >
              CONFIRM YOUR SPOT
            </GreenButton>
          </div>
        </CenterContainer>

        <Modal isOpen={modalOpen} closeModal={closeModal}>
          {choice === 'ACCEPT' && <RSVPForm closeModal={closeModal} />}
          {choice === 'DECLINE' && <DeclineSpotContent />}
        </Modal>
      </Container>
    );
  }

  if (user.attendanceConfirmed === true) {
    return (
      <Container>
        <CenterContainer>
          <ConfirmedPlaceholder />
        </CenterContainer>
      </Container>
    );
  }

  if (user.attendanceConfirmed === false) {
    return (
      <Container>
        <CenterContainer>
          <DeclinedPlaceholder />
        </CenterContainer>
      </Container>
    );
  }
}

export default HackerPortal;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

const Heading = styled.h1`
  font-family: Inter;
  font-size: 60px;
  font-weight: 500;
  line-height: 72.61px;
  letter-spacing: -0.05em;
  text-align: left;
  color: #ff6347;
  text-align: center;
`;

const Heading3 = styled(H3)`
  color: #ff6347;
`;

const TextBody = styled.p`
  font-family: Inter;
  font-size: 25px;
  font-weight: 400;
  line-height: 30.26px;
  text-align: center;
  color: #ffb1a3;
`;

const RedButton = styled.button`
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 1px solid black;

  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffb1a3;
  //fonts
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  color: black;
  :hover {
    background: #ffded9;
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    background: #ffb1a3;
  }
`;

const GreenButton = styled.button`
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 1px solid black;

  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ddfc75;
  //fonts
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  color: black;
  :hover {
    background: #e5fdc7;
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    background: #ddfc75;
  }
`;

const Stars = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;

const StarTop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={757}
    height={257}
    fill="none"
    {...props}
  >
    <path
      fill="#F3FFD2"
      stroke="#000"
      strokeWidth={0.517}
      d="M364.795-255.875 445.66-124.74l.112.181.198-.075 189.403-70.756-81.592 135.45-.191.318.363.07 201.484 38.947-196.059 60.61-.353.11.224.294 95.828 125.783-195.97-49.757-.206-.052-.091.192-66.137 139.145-80.866-131.135-.111-.181-.199.075-189.403 70.756 81.592-135.45.191-.318-.363-.07L2.03 20.45 198.09-40.16l.353-.11-.224-.294-95.827-125.783 195.97 49.757.205.052.092-.192 66.137-139.145Z"
    />
  </svg>
);

const StarBottom = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={326}
    height={422}
    fill="none"
    {...props}
  >
    <path
      fill="#F3FFD2"
      stroke="#000"
      strokeWidth={0.424}
      d="m298.925 1.33 66.338 107.577.091.148.163-.061 155.377-58.045-66.934 111.117-.156.26.297.058 165.288 31.95-160.837 49.722-.29.09.184.241 78.612 103.186-160.764-40.818-.169-.043-.075.158-54.256 114.148-66.338-107.577-.091-.148-.163.061-155.377 58.045 66.934-111.117.157-.26-.298-.058L1.33 228.014l160.837-49.722.29-.09-.184-.241L83.661 74.775l160.764 40.818.169.042.075-.157L298.925 1.33Z"
    />
  </svg>
);

// const ApplyButton = styled.button`
//   cursor: pointer;
//   background-color: ${Colors2023.GREEN.DARK};
//   color: #f4f4f4;
//   font-weight: 500;
//   padding: 8px;
//   border-radius: 8px;
//   font-size: 15px;
//   transition: all 0.3s;
//   margin-left: 10px;

//   &:hover {
//     background-color: #026440;
//     color: #e9ffc5;
//     transition: all 0.3s;
//   }

//   @media (max-width: 400px) {
//     margin-left: 0px;
//   }
// `;

// const MessageContainer = styled.div`
//   display: flex;
//   flex-direction: column;

//   justify-content: center;
//   align-items: center;
//   gap: 5px;
//   padding-top: 50px;
// `;

// const BannerContainer = styled.div`
//   display: flex;
//   background-color: #3b3b3b;
//   padding: 15px;
//   border-radius: 10px;
//   margin-top: 20px;
//   box-shadow: 0px 0px 5px #8e8e8e;

//   @media (max-width: 400px) {
//     flex-direction: column;
//   }
// `;

// const WelcomeContainer = styled.div`
//   @media (max-width: 400px) {
//     margin-top: 5rem;
//   }
// `;
