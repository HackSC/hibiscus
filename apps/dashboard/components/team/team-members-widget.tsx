import { Colors2023 } from '@hibiscus/styles';
import { H3, Modal, Text } from '@hibiscus/ui';
import { Button, OneLineText } from '@hibiscus/ui-kit-2023';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillCrown, AiFillPlusCircle } from 'react-icons/ai';
import { GrayBox } from '../gray-box/gray-box';
import { TeamMember } from '../../common/types';
import { toast } from 'react-hot-toast';
import { HibiscusUser } from '@hibiscus/types';
import { useTeam } from '../../hooks/use-team/use-team';

type Member = TeamMember & { admin: boolean; invited: boolean };

function TeamMembersWidget() {
  const { team } = useTeam();
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [isOpen, setOpen] = useState(false);
  const isCurrentUserAdmin = true;
  const [invites, setInvites] = useState<HibiscusUser[]>([]);

  const handleOnClickAddMembers: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    setOpen(true);
  };

  const handleOnClickKick: (
    member: TeamMember
  ) => React.MouseEventHandler<HTMLButtonElement> = (member) => () => {
    setTeamMembers((prev) => prev.filter((it) => it.id === member.id));
    // TODO: call API to kick
  };

  const InviteForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = () => {
      toast.success('An invite email has been sent to their email address!', {
        duration: 5000,
      });
      // TODO: logic
      setOpen(false);
    };

    const handleClickSubmitInviteMembers: React.MouseEventHandler<
      HTMLButtonElement
    > = (e) => {
      handleSubmit();
      e.preventDefault();
    };

    const handleKeyEnter: React.KeyboardEventHandler<HTMLInputElement> = (
      e
    ) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    return (
      <>
        <OneLineText
          placeholder="User email"
          onKeyDown={handleKeyEnter}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          color="blue"
          type="submit"
          onClick={handleClickSubmitInviteMembers}
        >
          SUBMIT
        </Button>
      </>
    );
  };

  const SentInvites = () => {
    return (
      <div>
        {team.invites.map((item, i) => (
          <ListItemContainer>
            <LeftItemContainer>
              <Text style={{ color: 'gray' }}>
                {item.user_profiles.first_name} {item.user_profiles.last_name}
              </Text>
            </LeftItemContainer>
            <ItemButtonsContainer>
              <Text style={{ color: 'gray' }}>Invite sent</Text>
              <Button color="red">REMOVE</Button>
            </ItemButtonsContainer>
          </ListItemContainer>
        ))}
      </div>
    );
  };

  const Members = () => (
    <>
      {teamMembers.map((item, i) => {
        return (
          <ListItemContainer key={i}>
            <LeftItemContainer>
              <Text>{item.name}</Text>
              {item.admin && <AiFillCrown />}
            </LeftItemContainer>
            <ItemButtonsContainer>
              {!item.admin && isCurrentUserAdmin && (
                <Button color="red" onClick={handleOnClickKick(item)}>
                  KICK
                </Button>
              )}
            </ItemButtonsContainer>
          </ListItemContainer>
        );
      })}
    </>
  );

  return (
    <Container>
      <Modal
        isOpen={isOpen}
        closeModal={() => {
          setOpen(false);
        }}
      >
        <GrayBox style={{ gap: '10px' }}>
          <InviteForm />
        </GrayBox>
      </Modal>
      <TopContainer>
        <H3 style={{ fontWeight: 600 }}>Members</H3>
        <Button color="black" onClick={handleOnClickAddMembers}>
          <AiFillPlusCircle /> Add members
        </Button>
      </TopContainer>
      <GrayBox>
        <List>
          <Members />
          <SentInvites />
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

const ItemButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LeftItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
