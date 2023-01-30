import { Text, BoldText, Modal } from '@hibiscus/ui';
import { Search } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import searchUser from '../../../common/search-user';
import { ScrollableListBox } from '../scrollable-list-box/scrollable-list-box';

interface SearchUserEventBoxProps {
  onClick: (value: string) => void;
}

export function SearchUserEventBox({ onClick }: SearchUserEventBoxProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchUser>>
  );

  async function search(name: string) {
    setSearchRes(await searchUser(name));

    setModalOpen(true);
  }

  return (
    <>
      <Search placeholder="Search by attendee name" onInput={search}></Search>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <ScrollableListBox width={500} height={500}>
          {searchRes.map((user, i) => (
            <ScrollableListBox.ItemClickable
              key={i}
              value={user.user_id}
              onClick={(value) => {
                onClick(value);
                setModalOpen(false);
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

// .alert-container {
//   position: absolute;
//   top: 2rem;
//   left: 0;
//   right: 0;
// }

// .alert-inner {
//   display: inline-block;
//   padding: 8px 16px;
//   z-index: 1;
//   background-color: #ffffff;
//   box-shadow: 1px 2px 10px -3px rgb(0 0 0 / 70%);
//   -webkit-box-shadow: 1px 2px 10px -3px rgb(0 0 0 / 70%);
//   -moz-box-shadow: 1px 2px 10px -3px rgb(0 0 0 / 70%);
// }
