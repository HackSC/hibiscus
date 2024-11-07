import { useEffect, useMemo, useState } from 'react';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { Attendee } from 'apps/dashboard/common/mock-sponsor';
import { useRouter } from 'next/router';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import { SponsorServiceAPI } from 'apps/dashboard/common/api';
import { FaBookmark, FaChevronUp, FaRegBookmark } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';

type SortKey = keyof Pick<Attendee, 'full_name' | 'graduation_year' | 'major' | 'school'>;

export default function Index() {
  const router = useRouter();
  const supabase = useHibiscusSupabase().supabase.getClient();

  const { user } = useHibiscusUser();
  const COMPANY_ID = router.query.companyId as string;
  const EVENT_ID = router.query.eventId as string;
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<{ key: SortKey | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });
  const sortButtons: { key: SortKey; label: string }[] = [
    { key: 'full_name', label: 'Name' },
    { key: 'graduation_year', label: 'Year' },
    { key: 'major', label: 'Major' },
    { key: 'school', label: 'School' },
  ]

  useEffect(() => {
    getAttendees();
  }, [])

  async function getAttendees() {
    try {
      const res = await SponsorServiceAPI.getCheckInAttendee(COMPANY_ID, EVENT_ID); 

      if (res.error) {
        console.error(res.error);
      } else {
        setAttendees(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const filteredAttendees = useMemo(() => {
    let filtered = search ? attendees.filter((attendee) => {
      const info = attendee.full_name + attendee.major + attendee.school;
      return info.toLowerCase().includes(search.toLowerCase());
    }) : attendees;

    if (sortBy.key) {
      filtered.sort((a, b) => {
        const direction = sortBy.direction === 'asc' ? 1 : -1;
        return (a[sortBy.key] < b[sortBy.key] ? -1 : 1) * direction;
      })
    }

    filtered.sort((a, b) => {
      if (a.saved === b.saved) return 0;
      return a.saved ? -1 : 1;
    })

    return filtered;
  }, [attendees, search, sortBy])

  async function handleSave(id: string, isSaved: boolean) {
    try {
      if (isSaved) {
        await SponsorServiceAPI.unsaveAttendee(COMPANY_ID, id);
      } else {
        await SponsorServiceAPI.saveAttendee(COMPANY_ID, id);
      }

      setAttendees(prev => prev.map(attendee => attendee.id === id ? {...attendee, saved: !isSaved } : attendee));
    } catch (error) {
      console.error(error);
    }
  }

  function handleSort(key: SortKey) {
    setSortBy((current) => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  }

  return (
    <div>
      <div>
        <h2 className='m-0 text-2xl'>Hacker Attendees</h2>
        <div className='w-full flex items-center my-8 px-4 py-3 bg-gray-100 border-solid border-[1px] border-gray600 rounded-md text-sm'>
          <FiSearch className='mr-2' />
          <input
            className='w-full bg-transparent placeholder:text-gray-600 text-gray-600 border-none focus:border-none focus:outline-none focus:ring-transparent'
            type='search'
            placeholder='Search for an attendee'
            onChange={(e) => { setSearch(e.target.value) }}
          />
        </div>

        {/* Mobile sorting */}

        {/* Desktop list */}
        <table className='hidden md:table w-full table-auto'>
          <thead>
            <tr>
              {sortButtons.map((category) => (
                <th
                  key={category.key}
                  className='px-2 py-3 text-left text-md text-gray-900 tracking-wider'
                >
                  <button onClick={() => handleSort(category.key)} className='flex items-center cursor-pointer'>
                    <span className='mr-2'>{category.label}</span>
                    {sortBy.key === category.key ? (
                      sortBy.direction === 'asc' ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    ) : (<FaChevronDown />)}
                  </button>
                </th>
              ))}
              <th className='w-48 py-3 text-right text-md text-gray-900 tracking-wider'>
                <span className='sr-only'>Save</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.map((attendee) => (
              <tr key={attendee.id}>
                <td className='px-2 py-3 whitespace-nowrap text-md text-gray-500'>{attendee.full_name}</td>
                <td className='px-2 py-3 whitespace-nowrap text-md text-gray-500'>{attendee.graduation_year}</td>
                <td className='px-2 py-3 whitespace-nowrap text-md text-gray-500'>{attendee.major}</td>
                <td className='px-2 py-3 whitespace-nowrap text-md text-gray-500'>{attendee.school}</td>
                <td className='w-48 py-3 whitespace-nowrap'>
                  <button
                    onClick={() => handleSave(attendee.id, attendee.saved)}
                    className='cursor-pointer float-end'
                  >
                    {attendee.saved ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile list */}
        <div className='md:hidden'>
          {filteredAttendees.map((attendee) => (
            <div
              key={attendee.id}
              className='flex items-center justify-between py-4'
            >
              <div>
                <h3 className='text-lg font-semibold text-gray-900'>{attendee.full_name}</h3>
                <span className='text-sm text-gray-500 mt-1 mr-4'>{attendee.graduation_year}</span>
                <span className='text-sm text-gray-500 mt-1 mr-4'>{attendee.major}</span>
                <span className='text-sm text-gray-500 mt-1 mr-4'>{attendee.school}</span>
              </div>
              <button
                onClick={() => handleSave(attendee.id, attendee.saved)}
                className='cursor-pointer'
              >
                {attendee.saved ? <FaBookmark /> : <FaRegBookmark />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
