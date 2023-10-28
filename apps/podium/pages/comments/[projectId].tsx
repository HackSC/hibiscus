import Comment from '../../components/comment/comment';
import SendComment from '../../components/send-comment/send-comment';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { Modal } from '@hibiscus/ui';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';

const backgroundColor = 'white';
const BlueIvy = '#002990';

const HIBISCUS_PODIUM_API_URL = process.env.NEXT_PUBLIC_HIBISCUS_PODIUM_API_URL;

export function Index() {
  const router = useRouter();

  const [data, setData] = useState(null);
  const [inputOpen, setInputOpen] = useState(false);

  const projectId = useMemo(
    () => router.query?.projectId?.toString(),
    [router.query]
  );

  const fetchData = async (projectId: string) => {
    try {
      const response = await axios.get(
        `${HIBISCUS_PODIUM_API_URL}/comments/${projectId}`
      );
      setData(response.data);
      console.log(response.data);
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

  return (
    <>
      <Background>
        <PhoneScreen>
          <HeadingRow>
            <p
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              &lt; Slide
            </p>
            <Heading>Comments</Heading>
            <div
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            ></div>
          </HeadingRow>

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
        </PhoneScreen>
      </Background>

      <StyledButton onClick={() => setInputOpen(true)}>
        <FiEdit3 size={35} color="white" />
      </StyledButton>

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

const Background = styled.div`
  background-color: ${backgroundColor};
`;

const PhoneScreen = styled.div`
  max-width: 393px;
  background: ${backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  justify-content: flex-start;
  gap: 40px;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-weight: 700;
  font-size: 24px;
`;

const HeadingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const buttonMargin = '10px';
const buttonSize = '65px';

const StyledButton = styled.button`
  border-radius: 50%;
  background-color: ${BlueIvy};
  width: ${buttonSize};
  height: ${buttonSize};

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: ${buttonMargin};
  top: calc(100vh - ${buttonSize} - ${buttonMargin});

  cursor: pointer;

  :hover {
    background-color: ;
  }
`;

export default Index;
