import { Colors2023 } from '@hibiscus/styles';
import { Link } from '@hibiscus/ui';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PortalMenuProps {
  chosenTabIndex: number; // starts at 0
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
  return (
    <Wrapper>
      <ZoomBackContainer>sad</ZoomBackContainer>
      <ItemsWrapper>
        {tabRoutes.map((item, i) => (
          <TabItemContainer key={i} active={props.chosenTabIndex === i}>
            <Link href={item.url} anchortagpropsoverride={{ target: '_self' }}>
              {item.displayName}
            </Link>
          </TabItemContainer>
        ))}
      </ItemsWrapper>
    </Wrapper>
  );
}

export default PortalMenu;

const Wrapper = styled.div`
  font-family: 'Inter';
  color: white;
  max-width: max-content;
  min-height: max-content;
  max-height: 10rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: ${Colors2023.GRAY.DARK};
  border: 1.5px solid ${Colors2023.GRAY.SCHEMDIUM};
  box-shadow: 1px 2px 13px 1px ${Colors2023.GRAY.DARK};
  gap: 10px;
  padding: 25px;
  border-radius: 10px;
`;

const ZoomBackContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabItemContainer = styled.div<{ active?: boolean }>`
  padding-left: 0.5rem;
  border-left: ${(props) => (props.active ? '2px solid white' : '')};
`;
