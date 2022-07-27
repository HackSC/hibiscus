import React from 'react';
import styled from 'styled-components';
import GradientSpan from '../gradient-span/gradient-span';

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
            <Bullet>
              <GradientSpan>+{'\u00a0'}</GradientSpan>
            </Bullet>
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
  color: #2b2b2b;
  font-family: Inter, sans-serif;
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    background-color: #f3f3f3;
    border-radius: 0.4rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 30vw;
  max-width: 50vw;
`;

const Bullet = styled.h3`
  font-size: 2rem;
  font-family: Inter, sans-serif;
  font-weight: bolder;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const DisclosedElementContainer = styled.div`
  padding-left: 1.25rem;
  padding-right: 1rem;
  border-left: solid 2px #2b2b2b;
  font-size: 1.5rem;
  color: #2b2b2b;
`;
