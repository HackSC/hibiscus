import { MaximizeTwoArrowIcon, MinimizeTwoArrowIcon } from '@hibiscus/icons';
import { Colors2023 } from '@hibiscus/styles';
import { Link, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { getColorsForRole } from 'apps/dashboard/common/role.utils';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PortalMenuProps {
  chosenTabIndex?: number; // starts at 0
}

interface TabRoute {
  displayName: string;
  url: string;
}

const tabRoutes: TabRoute[] = [
  { displayName: 'Home', url: '/' },
  { displayName: 'Apply as a hacker', url: '/apply-2023' },
  { displayName: 'Team', url: '/team' },
];

export function PortalMenu(props: PortalMenuProps) {
  const router = useRouter();
  const getTabIndexFromPageRoute = () => {
    const fti = tabRoutes.findIndex((item) => item.url === router.pathname);
    return fti;
  };
  const [isOpen, setOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(
    props.chosenTabIndex ?? getTabIndexFromPageRoute()
  );
  const { user } = useHibiscusUser();
  const colors = getColorsForRole(user.role);

  const handleMaximize = () => {
    setOpen(true);
  };

  const handleMinimize = () => {
    setOpen(false);
  };

  const handleClickTab = (ti: number) => {
    setActiveTabIndex(ti);
  };

  const LeftBarWhenActive = () => (
    <div
      style={{
        backgroundColor: colors.standard,
        filter: 'brightness(140%)',
        boxShadow: `-1px 0px 15px ${colors.standard}`,
        height: 'max-height',
        width: '4px',
        borderRadius: '5px',
      }}
    />
  );

  const Menu = () => (
    <>
      <ZoomBackContainer>
        <IconButton onClick={handleMinimize}>
          <MinimizeTwoArrowIcon />
        </IconButton>
      </ZoomBackContainer>
      <ItemsWrapper>
        {tabRoutes.map((item, i) => {
          const active = activeTabIndex === i;
          return (
            <TabItemContainer key={i} active={active} color={colors.standard}>
              {active && <LeftBarWhenActive />}
              <LinkText>
                <Link
                  href={item.url}
                  onClick={() => {
                    handleClickTab(i);
                  }}
                  anchortagpropsoverride={{ target: '_self' }}
                >
                  {active ? (
                    <GlowSpan
                      color={colors.light}
                      shadowColor={colors.standard}
                      style={{ fontWeight: 600 }}
                    >
                      {item.displayName}
                    </GlowSpan>
                  ) : (
                    <>{item.displayName}</>
                  )}
                </Link>
              </LinkText>
            </TabItemContainer>
          );
        })}
      </ItemsWrapper>
    </>
  );

  if (!isOpen) {
    return (
      <Wrapper isOpen={isOpen}>
        <IconButton onClick={handleMaximize}>
          <MaximizeTwoArrowIcon />
        </IconButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper isOpen={isOpen}>
      <Menu />
    </Wrapper>
  );
}

export default PortalMenu;

const Wrapper = styled.nav<{ isOpen?: boolean }>`
  font-family: 'Inter';
  color: white;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  background-color: ${Colors2023.GRAY.STANDARD};
  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 15px ${Colors2023.GRAY.MEDIUM};
  padding: ${(props) => (props.isOpen ? '7px 5px 25px' : '10px 7px')};
  border-radius: 10px;
`;

const ZoomBackContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ItemsWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  gap: 10px;
  max-width: max-content;
  margin: 5px 40px 0 20px;
`;

const TabItemContainer = styled.div<{ active?: boolean; color: string }>`
  height: 100%;
  display: flex;
  gap: 10px;
  padding-left: 10px;
`;

const IconButton = styled.button`
  appearance: none;
  background-color: transparent;
  cursor: pointer;
`;

const LinkText = styled(Text)`
  :hover {
    text-decoration: underline;
  }
`;
