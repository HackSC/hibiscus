import { H2 } from '@hibiscus/ui';
import { useState } from 'react';
import CreateTeamModal from '../../components/team/modal';
import { Button } from '@hibiscus/ui-kit-2023';
import { RiTeamFill } from 'react-icons/ri';
import styled from 'styled-components';

function NoTeamPlaceholder() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <Div>
      <H2>You&apos;re not part of any team yet!</H2>
      <Button color="black" onClick={openModal}>
        <RiTeamFill /> Create a team
      </Button>
      <CreateTeamModal isOpen={isOpen} closeModal={closeModal} />
    </Div>
  );
}

export default NoTeamPlaceholder;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
