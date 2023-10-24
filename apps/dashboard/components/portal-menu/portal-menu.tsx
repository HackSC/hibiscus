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
import { HibiscusRole } from '@hibiscus/types';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface PortalMenuProps {}

export function PortalMenu() {
  const { user } = useHibiscusUser();
  const router = useRouter();
  const { tabRoutes, cti } = useAppSelector((state) => ({
    tabRoutes:
      (user?.role === HibiscusRole.HACKER && state.menu.tabRoutes) ||
      (user?.role === HibiscusRole.SPONSOR && state.menu.sponsorRoutes) ||
      [],
    cti: state.menu.currentTabIndex,
  }));
  const isOpen = true;
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
        backgroundColor: 'white',
        filter: 'brightness(140%)',
        height: 'max-height',
        width: '7px',
      }}
    />
  );

  const Menu = () => (
    <MenuWrap>
      <Link href="/" anchortagpropsoverride={{ target: '_self' }}>
        <Image
          style={{ margin: '5px 0 0 20px' }}
          width="200"
          height="100"
          src="/hacksc-logo.svg"
          alt="HackSC logo"
        />
      </Link>
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
                  <>{item.displayName}</>
                </Link>
              </LinkText>
            </TabItemContainer>
          );
        })}
      </ItemsWrapper>
    </MenuWrap>
  );
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
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${Colors2023.GRAY.STANDARD};
  background: var(--Arthurs-Sweater, #ecb400);
`;

const MenuWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemsWrapper = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
`;

const TabItemContainer = styled.div<{ active?: boolean; color: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  gap: 10px;
  background-color: ${(props) => (props.active ? '#CEA00D' : 'none')};
`;

const IconButton = styled.button`
  appearance: none;
  background-color: transparent;
  cursor: pointer;
`;

const LinkText = styled.p`
  :hover {
    text-decoration: underline;
  }
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Neue Haas Unica;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
