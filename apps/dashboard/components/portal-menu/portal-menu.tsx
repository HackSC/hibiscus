import { MaximizeTwoArrowIcon, MinimizeTwoArrowIcon } from '@hibiscus/icons';
import { Colors2023 } from '@hibiscus/styles';
import { Link } from '@hibiscus/ui';
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
  const [isOpen, setOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(props.chosenTabIndex);

  const handleMaximize = () => {
    setOpen(true);
  };

  const handleMinimize = () => {
    setOpen(false);
  };

  const handleClickTab = (ti: number) => {
    setActiveTabIndex(ti);
  };

  if (!isOpen) {
    return (
      <Wrapper>
        <IconButton onClick={handleMaximize}>
          <MaximizeTwoArrowIcon />
        </IconButton>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ZoomBackContainer>
        <IconButton onClick={handleMinimize}>
          <MinimizeTwoArrowIcon />
        </IconButton>
      </ZoomBackContainer>
      <ItemsWrapper>
        {tabRoutes.map((item, i) => (
          <TabItemContainer key={i} active={activeTabIndex === i}>
            <Link
              href={item.url}
              onClick={() => {
                handleClickTab(i);
              }}
              anchortagpropsoverride={{ target: '_self' }}
            >
              {item.displayName}
            </Link>
          </TabItemContainer>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
}

export default PortalMenu;

const Wrapper = styled.div<{ isOpen?: boolean }>`
  font-family: 'Inter';
  color: white;
  max-height: 30rem;
  display: flex;
  flex-direction: column;
  background-color: ${Colors2023.GRAY.DARK};
  border: 2px solid ${Colors2023.GRAY.MEDIUM};
  box-shadow: 1px 2px 10px 2px ${Colors2023.GRAY.MEDIUM};
  padding: ${(props) => (props.isOpen ? '1rem' : '13px')};
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
  margin-right: 40px;
`;

const TabItemContainer = styled.div<{ active?: boolean }>`
  padding-left: 0.5rem;
  border-left: ${(props) => (props.active ? '2px solid white' : '')};
`;

const IconButton = styled.button`
  appearance: none;
  background-color: transparent;
  cursor: pointer;
`;
