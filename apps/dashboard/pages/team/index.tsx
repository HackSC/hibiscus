import PortalLayout from '../../layouts/portal-layout';
import React, { useState } from 'react';
import styled from 'styled-components';
import TeamHeader from '../../components/team/team-header';
import TeamMembersWidget from '../../components/team/team-members-widget';
import Modal from '../../components/team/modal';
import { Button } from '@hibiscus/ui-kit-2023';
import { RiTeamFill } from 'react-icons/ri';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <PortalLayout>
      <PageContainer>
        <TeamHeader />
        <TeamMembersWidget />
        <div>
          <Button color="black" onClick={openModal}>
            <RiTeamFill /> Create a team
          </Button>
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} />
      </PageContainer>
    </PortalLayout>
  );
};

export default Index;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin: 6rem 16rem;
`;
