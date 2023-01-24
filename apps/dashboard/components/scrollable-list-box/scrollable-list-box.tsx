import { Colors2023 } from '@hibiscus/styles';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ScrollableListBoxProps extends PropsWithChildren {
  width?: number | string;
  height?: number | string;
}

export function ScrollableListBox({
  children,
  width,
  height,
}: ScrollableListBoxProps) {
  return <Container style={{ width, height }}>{children}</Container>;
}

ScrollableListBox.Item = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem 0;

  &:not(:last-child) {
    border-bottom: thin solid ${Colors2023.GRAY.MEDIUM};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 385px;

  padding: 1.5rem 2.5rem;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;

  overflow-y: scroll;
`;
