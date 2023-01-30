import { Text, BoldText, Modal } from '@hibiscus/ui';
import { Search } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import searchEvent from '../../../common/search-event';
import { ScrollableListBox } from '../scrollable-list-box/scrollable-list-box';
import { useRouter } from 'next/router';

export function SearchEventBox() {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchRes, setSearchRes] = useState(
    [] as Awaited<ReturnType<typeof searchEvent>>
  );

  async function search(name: string) {
    setSearchRes(await searchEvent(name));

    setModalOpen(true);
  }

  return (
    <>
      <Search placeholder="Search by event name" onInput={search}></Search>

      <Modal isOpen={isModalOpen} closeModal={() => setModalOpen(false)}>
        <ScrollableListBox width={500} height={500}>
          {searchRes.map((event, i) => (
            <ScrollableListBox.ItemClickable
              key={i}
              value={event.id}
              onClick={(id) =>
                router.push(`/identity-portal/attendee-event-scan?id=${id}`)
              }
            >
              <BoldText style={{ fontSize: '1em' }}>
                {event.name} {event.location}
              </BoldText>
              <Text style={{ fontSize: '0.75em' }}>{event.points}</Text>
            </ScrollableListBox.ItemClickable>
          ))}
        </ScrollableListBox>
      </Modal>
    </>
  );
}
