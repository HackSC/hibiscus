import { Text } from '@hibiscus/ui';
import { TeamServiceAPI } from '../../../common/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const RejectPage = () => {
  const router = useRouter();

  useEffect(() => {
    // accept invite
    const inviteId = router.query.inviteId as string;
    TeamServiceAPI.rejectInvite(inviteId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          toast.error(error.message);
        } else {
          toast.success('Rejected team invite');
          router.replace('/team');
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Text>Rejecting invite...</Text>
    </div>
  );
};

export default RejectPage;
