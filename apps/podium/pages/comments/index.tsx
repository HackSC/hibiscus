import styles from '../index.module.scss';
import Comment from '../../components/comment/comment';
import SendComment from '../../components/send-comment/send-comment';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

const backgroundColor = 'white';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const [projectId, setProjectId] = useState(
    '1f6e3db9-1976-4f33-bf04-7df9d1e03a71'
  );
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://iegz97vdvi.execute-api.us-west-1.amazonaws.com/api/comments/' +
          projectId
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call fetchData inside useEffect for initial fetch
  useEffect(() => {
    fetchData();
  }, []); // Only on component mount

  return (
    <Background>
      <PhoneScreen>
        <SendComment
          placeholder="Enter text..."
          buttonText="Go"
          onButtonClick={() => console.log('Button clicked!')}
          fetchData={fetchData}
        />
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
  );
}

const Background = styled.div`
  background-color: ${backgroundColor};
`;
const PhoneScreen = styled.div`
  width: 393px;
  background: ${backgroundColor};
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 30px;
  justify-content: flex-start;
  gap: 40px;
  margin: 0 auto;
`;
export default Index;
