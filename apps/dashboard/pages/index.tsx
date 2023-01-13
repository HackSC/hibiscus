import { H1, H3 } from '@hibiscus/ui';
import styled from 'styled-components';
import GrayContentBox from '../components/gray-content-box/gray-content-box';
import { Search } from '@hibiscus/ui-kit-2023';
import Image from 'next/image';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { Colors2023 } from '@hibiscus/styles';
import useHibiscusUser from '../hooks/use-hibiscus-user/use-hibiscus-user';
import { getColorsForRole } from '../common/role.utils';
import { HibiscusRole } from '@hibiscus/types';

export function Index() {
  const { user } = useHibiscusUser();

  if (user == null) {
    return <>Loading</>;
  }

  const userColors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);

  return (
    <Wrapper>
      <LayoutContainer>
        <div
          style={{
            display: 'inline-flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <H1
              style={{
                color: userColors.light,
                fontSize: '30px',
                textShadow: `0px 0px 10px ${userColors.standard}`,
              }}
            >
              Welcome, {user.firstName}
            </H1>
            <H3 style={{ color: '#989898' }}>
              What would you like to do today?
            </H3>
          </div>
          {/* <Search
              placeholder={'Search...'}
              onInput={function (value: string): void {
                throw new Error('Function not implemented.');
              }}
            ></Search> */}
        </div>

        <MessageContainer>
          <H1 style={{ fontSize: '50px', lineHeight: '60px' }}>
            <GlowSpan
              color={Colors2023.BLUE.LIGHT}
              shadowColor={Colors2023.BLUE.STANDARD}
            >
              Coming Soon!
            </GlowSpan>
          </H1>

          <Image
            src={'/assets/earth-suitcase-moon.svg'}
            width={200}
            height={200}
            alt="Earth-like character wearing shades pulling baggage and a moon"
          />
        </MessageContainer>

        {/* <div> */}
        {/* <p style={{ margin: '13px 0' }}>Quick Actions</p> */}
        {/* <QuickActionContainer> */}
        {/* <GrayContentBox location="/redstar.svg"></GrayContentBox> */}
        {/* <GrayContentBox location="/pinkstar.svg"></GrayContentBox> */}
        {/* <GrayContentBox location="/greenstar.svg"></GrayContentBox>
              <GrayContentBox location="/purplepin.svg"></GrayContentBox>
              <GrayContentBox location="/yellowpin.svg"></GrayContentBox> */}
        {/* </QuickActionContainer> */}
        {/* </div> */}
        {/* <AddOnAndStats>
            <AddOnOuter>
              <p style={{ textAlign: 'left', width: '90%', margin: '10px 0' }}>
                Add-Ons
              </p>
              <AddOn></AddOn>
            </AddOnOuter>
            <StatsOuter>
              <p style={{ textAlign: 'left', width: '90%', margin: '10px 0' }}>
                Stats
              </p>
              <Stats></Stats>
            </StatsOuter>
          </AddOnAndStats> */}
      </LayoutContainer>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LayoutContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

// const AddOnOuter = styled.div`
//   width: 41%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const AddOn = styled.div`
//   width: 94%;
//   height: 90%;
//   background: #363636;
//   /* smaller-red-glow */
//   border: 2px solid #5a5a5a;
//   border-radius: 10px;
//   /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const Stats = styled.div`
//   width: 100%;
//   height: 90%;
//   background: #363636;
//   border: 2px solid #5a5a5a;
//   /* smaller-red-glow */
//   /* box-shadow: 0px 0px 10px rgba(254, 81, 57, 0.5); */
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StatsOuter = styled.div`
//   width: 59%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const AddOnAndStats = styled.div`
//   display: inline-flex;
//   width: 100%;
//   height: 300px;
// `;

const QuickActionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 30px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 5px;
  padding-top: 100px;
`;
