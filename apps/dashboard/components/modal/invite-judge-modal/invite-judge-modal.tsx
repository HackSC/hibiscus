import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem 2.5rem;
  border-radius: 4px;
  border: 1px solid black;
  width: 100%;
  max-width: 580px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.12);
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #868686;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #eaeaea;
  &::placeholder {
    color: #5e5e5e;
    font-style: italic;
  }
`;

const Button = styled.button`
  background-color: #daeeff;
  color: #1a2a3a;
  padding: 0 1.5rem;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background-color: #d2e7fa;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="17"
    viewBox="0 0 18 17"
    fill="none"
  >
    <path
      d="M2 15.7143L16.1429 2M16.1429 15.7143L2 2"
      stroke="black"
      stroke-width="2.57143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

interface InviteJudgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (emails: string) => void;
}

export const InviteJudgesModal: React.FC<InviteJudgesModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [emails, setEmails] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(emails);
    setEmails('');
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Title>Invite Judges by email</Title>
        <form onSubmit={handleSubmit}>
          <Row>
            <Input
              type="text"
              placeholder="Email, comma separated"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
            />
            <Button type="submit">Invite</Button>
          </Row>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
