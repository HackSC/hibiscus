import styles from '../index.module.scss';
import Comment from '../../components/comment/comment';
import SendComment from '../../components/send-comment/send-comment';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  const [data, setData] = useState(null);

  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://iegz97vdvi.execute-api.us-west-1.amazonaws.com/api/comments/1f6e3db9-1976-4f33-bf04-7df9d1e03a71'
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  return (
    <PhoneScreen>
      <SendComment
        placeholder="Enter text..."
        buttonText="Go"
        onButtonClick={() => console.log('Button clicked!')}
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
  );
}
const PhoneScreen = styled.div`
  width: 393px;
  background: #161616;
  height: 852px;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 30px;
  justify-content: flex-start;
  gap: 40px;
`;
export default Index;
