import React from 'react';
import styled from 'styled-components';
import Button from '../button/button';

export interface ConfirmationProps {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function Confirmation({
  title,
  description,
  onClose,
  onCancel,
  onConfirm,
}: ConfirmationProps) {
  return (
    <StyledConfirmation>
      <InnerDivTop>
        <Div>
          <div>
            {typeof title === 'string' ? <HeadText>{title}</HeadText> : title}
          </div>
          <Close onClick={onClose}>&times;</Close>
        </Div>
        {typeof description === 'string' ? (
          <SubText>{description}</SubText>
        ) : (
          description
        )}
      </InnerDivTop>
      <InnerDivBottom>
        <CancelText onClick={onCancel}>CANCEL</CancelText>
        <Button color="blue" onClick={onConfirm}>
          CONFIRM
        </Button>
      </InnerDivBottom>
    </StyledConfirmation>
  );
}
export default Confirmation;
const Close = styled.button`
  all: unset;
  cursor: pointer;
  font-weight: bold;
  color: #565656;
  font-size: 25px;
`;
const CancelText = styled.button`
  all: unset;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: 0.2em;
  border: none;
  color: #f4f4f4;
  position: relative;
`;

const InnerDivTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
`;

const InnerDivBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 50px;
`;
const Div = styled.div`
  width: 100%;
  /* border: solid 1px red; */
  display: flex;
  justify-content: space-between;
`;

const HeadText = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 26.5462px;
  line-height: 37px;
  /* identical to box height, or 141% */

  display: flex;
  align-items: center;

  color: #f4f4f4;
  overflow-wrap: normal;
  margin: 0;
`;
const SubText = styled.p`
  width: 100%;
  text-align: left;
  font-style: normal;
  font-weight: 400;
  font-size: 20.3px;
  line-height: 31px;
  /* identical to box height, or 154% */

  display: flex;
  align-items: center;
  color: #f4f4f4;
  overflow-wrap: normal;
`;

const StyledConfirmation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24.9846px;

  width: 555px;
  min-height: 170px;

  /* gray/standard */

  background: #313131;
  /* gray/light */

  border: 3.12308px solid #f4f4f4;
  border-radius: 17px;

  /* Inside auto layout */

  /* flex: none;
    order: 0;
    flex-grow: 0; */
`;
