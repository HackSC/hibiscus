import React from 'react';
import styled from 'styled-components';
import { TrademarkColors } from '@hacksc-platforms/styles';
import { H3 } from '../heading/heading';

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
              <GradientSpan>
                {isOpen ? '−' : '+'}
                {'\u00a0'}
              </GradientSpan>
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

export default AccordionItem;

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
  color: #2b2b2b;
  font-size: 1.6rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: #f3f3f3;
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
  font-size: 1.5rem;
  color: #2b2b2b;
`;

const GradientSpan = styled.span`
  background: linear-gradient(
    to right,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
`;
