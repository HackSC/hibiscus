import { Colors2023 } from '@hibiscus/styles';
import { H3, Text } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import React from 'react';
import styled from 'styled-components';
import { AiFillCrown, AiFillPlusCircle } from 'react-icons/ai';
import { GrayBox } from '../gray-box/gray-box';

interface Team {
  members: TeamMember[];
}

interface TeamMember {
  name?: string;
  email: string;
  admin?: boolean;
}

function TeamMembersWidget() {
  const teamMembers: TeamMember[] = [
    { email: 'vinceny.fe@gmail.com', admin: true },
    { email: 'asdasd@gmail.com' },
  ].map((item) => ({ ...item, email: item.email.split('@', 1)[0] }));
  const isCurrentUserAdmin = true;

  const handleOnClickAddMembers: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    // TODO: implement
  };

  const handleOnClickKick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // TODO: implement
  };

  return (
    <Container>
      <TopContainer>
        <H3 style={{ fontWeight: 600 }}>Members</H3>
        <Button color="black" onClick={handleOnClickAddMembers}>
          <AiFillPlusCircle /> Add members
        </Button>
      </TopContainer>
      <GrayBox>
        <List>
          {teamMembers.map((item, i) => {
            return (
              <ListItemContainer key={i}>
                <LeftItemContainer>
                  <Text>{item.email}</Text>
                  {item.admin && <AiFillCrown />}
                </LeftItemContainer>
                <ItemButtonsContainer>
                  {!item.admin && isCurrentUserAdmin && (
                    <Button color="red" onClick={handleOnClickKick}>
                      KICK
                    </Button>
                  )}
                </ItemButtonsContainer>
              </ListItemContainer>
            );
          })}
        </List>
      </GrayBox>
    </Container>
  );
}

export default TeamMembersWidget;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 10px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const List = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`;

const ListItemContainer = styled.div`
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  border-bottom: 1px solid ${Colors2023.GRAY.MEDIUM};
  padding: 3px 0;
`;

const ItemButtonsContainer = styled.div``;
const LeftItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
