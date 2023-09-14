import styles from '../index.module.scss';
import Comment from '../../app/comment/comment';
import SendComment from '../../components/send-comment/send-comment';
import styled from 'styled-components';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <PhoneScreen>
      <SendComment
        placeholder="Enter text..."
        buttonText="Go"
        onButtonClick={() => console.log('Button clicked!')}
      />
      <Comment></Comment>
      <Comment></Comment>
      <Comment></Comment>
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
