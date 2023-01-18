import { Text } from '@hibiscus/ui';
import { TeamServiceAPI } from '../../../common/api';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const AcceptPage = () => {
  const router = useRouter();

  useEffect(() => {
    // accept invite
    const inviteId = router.query.inviteId as string;
    TeamServiceAPI.acceptInvite(inviteId)
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          toast.error(error.message);
        } else {
          console.log(data);
          router.replace('/team');
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error(e.message);
      });
  }, []);

  return (
    <div>
      <Text>Accepting invite...</Text>
    </div>
  );
};

export default AcceptPage;

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
// 	const inviteId = ctx.query.inviteId as string;
// 	// redirect without doing anything
// 	if(!inviteId) {
// 		return {
// 			redirect: {
// 				destination: "/team",
// 				statusCode: 301,
// 			}
// 		}
// 	}

// 	// accept invite
// 	const {data, error} = await TeamServiceAPI.acceptInvite(inviteId);
// 	console.log('eh')
// 	if(error) {
// 		console.error(error);
// 	} else {
// 		console.log(data);
// 	}

// 	return {
// 		redirect: {
// 			destination: "/team",
// 			statusCode: 301,
// 		}
// 	}
// }
