import Comment from '../../components/comment/comment';
import SendComment from '../../components/send-comment/send-comment';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@hibiscus/ui';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as styles from '../../styles/index.css';
import { getCookie } from 'cookies-next';
import { getEnv } from '@hibiscus/env';
import { useHibiscusUser } from '@hibiscus/hibiscus-user-context';
import { HibiscusRole } from '@hibiscus/types';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

export function Index() {
  const env = getEnv();

  const { user } = useHibiscusUser();

  const router = useRouter();

  const [data, setData] = useState(null);
  const [inputOpen, setInputOpen] = useState(false);

  const projectId = useMemo(
    () => router.query?.projectId?.toString(),
    [router.query]
  );

  const fetchData = async (projectId: string) => {
    try {
      const accessToken = getCookie(
        env.Hibiscus.Cookies.accessTokenName
      )?.toString();

      const response = await axios.get(
        `${HIBISCUS_PODIUM_API_URL}/comments/${projectId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call fetchData inside useEffect for initial fetch
  useEffect(() => {
    if (projectId != null) {
      fetchData(projectId);
    }
  }, [projectId]);

  if (user == null) {
    return <></>;
  }

  if (user?.role !== HibiscusRole.JUDGE) {
    window.location.assign(env.Hibiscus.AppURL.portal);
    return <></>;
  }

  return (
    <>
      <div className={styles.containerComments}>
        <header className={styles.flexBetween}>
          <p
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              fontSize: '16px',
            }}
          >
            <Link href="/">&lt; Back</Link>
          </p>
          <h1 style={{ fontSize: '24px' }}>Comments</h1>
          <div
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          ></div>
        </header>
        <br /> <br />
        <div>
          {data &&
            data.comments &&
            data.comments.map((commentObj, index) => (
              <Comment
                profilepicurl={commentObj.profilePicUrl}
                key={commentObj.id || index}
                name={commentObj.name}
                comment={commentObj.comment}
                timestamp={commentObj.createdAt}
              ></Comment>
            ))}
        </div>
        <FiEdit3
          color="#FFFFFF"
          className={styles.commentButton}
          onClick={() => setInputOpen(true)}
        />
      </div>

      <Modal isOpen={inputOpen} closeModal={() => setInputOpen(false)}>
        <SendComment
          placeholder="Enter text..."
          buttonText="Go"
          onButtonClick={() => setInputOpen(false)}
          fetchData={fetchData}
          projectId={projectId}
        />
      </Modal>
    </>
  );
}

export default Index;
