import React from 'react';
import styled from 'styled-components';
import { H3 } from '../heading/heading';
import { ColorSpan } from '../../../../ui-kit-2023/src/lib/color-span/color-span';
import { Colors2023 } from '../../../../styles/src/lib/colors';
/* eslint-disable-next-line */
/**
 * @property titleElement the element on the front where it will open the accordion on click event
 */
type Props = React.PropsWithChildren<{
  titleButtonElement: React.ReactNode; // element on the front
  color: string;
}>;

/**
 * A general purpose accordion component
 * @param props
 */
export function AccordionItem2023(props: Props) {
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
              <ColorSpan color={props.color}>
                {isOpen ? '−' : '+'}
                {'\u00a0'}
              </ColorSpan>
            </Bullet>
          </div>
          {props.titleButtonElement}
        </div>
      </ToggleItemButton>
      <DisclosedElementContainer>
        {isOpen && props.children}
      </DisclosedElementContainer>
    </AccordionContainer>
  );
}

export default AccordionItem2023;

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.1rem;
`;

const ToggleItemButton = styled.button`
  border: none;
  background: none;
  text-align: left;
  color: ${Colors2023.GRAY.LIGHT};
  font-size: 1.6rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: ${Colors2023.GRAY.STANDARD};
    border-radius: 0.4rem;
  }
`;

const Bullet = styled(H3)`
  font-size: 2rem;
  font-weight: bolder;
`;

const DisclosedElementContainer = styled.div`
  margin-top: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1rem;
  color: ${Colors2023.GRAY.LIGHT};
`;
