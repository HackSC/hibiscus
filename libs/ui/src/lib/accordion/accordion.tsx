import React from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
/**
 * @property titleElement the element on the front where it will open the accordion on click event
 */
type Props = React.PropsWithChildren<{
  titleButtonElement: React.ReactNode; // element on the front
}>;

/**
 * A general purpose accordion component
 * @param props
 */
export function AccordionItem(props: Props) {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <AccordionContainer>
      <ToggleItemButton
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              marginRight: 5,
            }}
          >
            <h3>+</h3>
          </div>
          <div>{props.titleButtonElement}</div>
        </div>
      </ToggleItemButton>
      <DisclosedElementContainer>
        {isOpen && props.children}
      </DisclosedElementContainer>
    </AccordionContainer>
  );
}

export default AccordionItem;

const ToggleItemButton = styled.button`
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DisclosedElementContainer = styled.div`
  margin: 0.3rem 0 0 0.5rem;
  padding-left: 1rem;
  border-left: solid 2px black;
`;
