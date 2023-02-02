import { Text, BoldText, Modal } from '@hibiscus/ui';
import { OneLineText } from '@hibiscus/ui-kit-2023';
import { ChangeEvent } from 'react';
import searchUser from '../../../common/search-user';
import { ScrollableListBox } from '../scrollable-list-box/scrollable-list-box';

interface SearchUserEventBoxProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: (value: string) => void;
  searchRes: Awaited<ReturnType<typeof searchUser>>;
  isModalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export function SearchUserEventBox(props: SearchUserEventBoxProps) {
  return (
    <>
      <OneLineText
        placeholder="Search by attendee name"
        value={props.value}
        onChange={props.onChange}
      />

      <Modal
        isOpen={props.isModalOpen}
        closeModal={() => props.setModalOpen(false)}
      >
        <ScrollableListBox width={500} height={500}>
          {props.searchRes.map((user, i) => (
            <ScrollableListBox.ItemClickable
              key={i}
              value={user.user_id}
              onClick={(value) => {
                props.onClick(value);
                props.setModalOpen(false);
              }}
            >
              <BoldText style={{ fontSize: '1em' }}>
                {user.first_name} {user.last_name}
              </BoldText>
              <Text style={{ fontSize: '0.75em' }}>{user.email}</Text>
            </ScrollableListBox.ItemClickable>
          ))}
        </ScrollableListBox>
      </Modal>
    </>
  );
}
