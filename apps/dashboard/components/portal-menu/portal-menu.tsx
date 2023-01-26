import { MaximizeTwoArrowIcon, MinimizeTwoArrowIcon } from '@hibiscus/icons';
import { Colors2023 } from '@hibiscus/styles';
import { Link, Text } from '@hibiscus/ui';
import { GlowSpan } from '@hibiscus/ui-kit-2023';
import { getColorsForRole } from '../../common/role.utils';
import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks';
import { changeTab, toggleMenuOpen } from '../../store/menu-slice';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { HibiscusRole, HibiscusUser } from '@hibiscus/types';

/* eslint-disable-next-line */
export interface PortalMenuProps {
  user: HibiscusUser;
}

export function PortalMenu({ user }: PortalMenuProps) {
  const router = useRouter();
  const { tabRoutes, cti, isOpen } = useAppSelector((state) => ({
    tabRoutes:
      (user?.role === HibiscusRole.HACKER && state.menu.tabRoutes) ||
      (user?.role === HibiscusRole.SPONSOR && state.menu.sponsorRoutes),
    cti: state.menu.currentTabIndex,
    isOpen: state.menu.isOpen,
  }));
  const dispatch = useAppDispatch();
  const colors = getColorsForRole(user?.role ?? HibiscusRole.HACKER);

  const getTabIndexFromPageRoute = useCallback(() => {
    const fti = tabRoutes.findIndex((item) => item.url === router.pathname);
    return fti;
  }, [router.pathname, tabRoutes]);

  const handleMaximize = () => {
    dispatch(toggleMenuOpen());
  };

  const handleMinimize = () => {
    dispatch(toggleMenuOpen());
  };

  useEffect(() => {
    const fti = getTabIndexFromPageRoute();
    dispatch(changeTab(fti));
  }, [dispatch, getTabIndexFromPageRoute]);

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
          const active = cti === i;
          return (
            <TabItemContainer key={i} active={active} color={colors.standard}>
              {active && <LeftBarWhenActive />}
              <LinkText>
                <Link
                  href={item.url}
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
