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

interface ItemClickableProps<T> extends PropsWithChildren {
  value: T;
  onClick: (value: T) => void;
}

ScrollableListBox.ItemClickable = function ItemClickable<T>({
  children,
  value,
  onClick,
}: ItemClickableProps<T>) {
  function clickHandler() {
    onClick(value);
  }

  return (
    <Clickable onClick={clickHandler}>
      <ScrollableListBox.Item>{children}</ScrollableListBox.Item>
    </Clickable>
  );
};

ScrollableListBox.Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1em 0;

  &:not(:last-child) {
    border-bottom: thin solid ${Colors2023.GRAY.MEDIUM};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 360px;
  height: 385px;

  padding: 1.5em 2.5em;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: thick solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 9px;

  overflow-y: scroll;
`;

const Clickable = styled.div`
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: thin solid ${Colors2023.GRAY.MEDIUM};
  }

  &:hover {
    background-color: ${Colors2023.GRAY.MEDIUM};
    padding: 0 1.5em;
    margin: 0 -1.5em;
  }

  &:active {
    background-color: ${Colors2023.GRAY.DARK};
    padding: 0 1.5em;
    margin: 0 -1.5em;
  }
`;
