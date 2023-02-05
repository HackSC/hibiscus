import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { Text, BoldText, Modal } from '@hibiscus/ui';
import { Search } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import searchUser from '../../../common/search-user';
import { ScrollableListBox } from '../scrollable-list-box/scrollable-list-box';

interface SearchUserBoxProps {
  onClick: (value: string) => void;
}

export function SearchUserBox({ onClick }: SearchUserBoxProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchUser>>
  );

  const { supabase } = useHibiscusSupabase();

  async function search(name: string) {
    setSearchRes(await searchUser(name, supabase));

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
              onClick={onClick}
            >
              <BoldText style={{ fontSize: '1em' }}>
                {user.first_name} {user.last_name}
              </BoldText>
              <Text style={{ fontSize: '0.75em' }}>{user.dob ?? ''}</Text>
            </ScrollableListBox.ItemClickable>
          ))}
        </ScrollableListBox>
      </Modal>
    </>
  );
}
