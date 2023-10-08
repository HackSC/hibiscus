import styles from './comment.module.scss';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CommentProps {
  name: string;
  profilepicurl: string;
  comment: string;
  timestamp: string;
}
function timeSince(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days) return `${days} days ago`;
  if (hours) return `${hours} hours ago`;
  if (minutes) return `${minutes} minutes ago`;
  return `${seconds} seconds ago`;
}
export function Comment({
  name,
  profilepicurl,
  comment,
  timestamp,
}: CommentProps) {
  return (
    <OuterContainer>
      <RowOne>
        <Circle src={profilepicurl} alt={'profile pic'} />
        <NameandReply>
          <Name>{name}</Name>
          <TimeStamp>{timeSince(timestamp)}</TimeStamp>
        </NameandReply>
      </RowOne>
      <RowTwo>
        <Body>{comment}</Body>
      </RowTwo>
      <RowThree></RowThree>
    </OuterContainer>
  );
}
const NameandReply = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;
const OuterContainer = styled.div`
  width: 355px;
  background: white;
`;
const RowOne = styled.div`
  width: 100%;
  height: 31px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const RowTwo = styled.div`
  width: 100%;
  padding-right: 30px;
`;
const RowThree = styled.div`
  width: 100%;
  height: 20px;
`;
const Name = styled.p`
  color: var(--black, #000);
  font-family: SF Pro Text;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const Body = styled.p`
  color: var(--black, #000);
  font-family: SF Pro Text;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const TimeStamp = styled.p`
  color: var(--black, #000);
  font-family: SF Pro Text;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const Circle = styled.img`
  border-radius: 50%;
  width: 31px; // You can adjust the width and height to fit your needs
  height: 31px;
  object-fit: cover;
`;
const Reply = styled.p`
  color: #8c8afd;
  font-family: SF Pro Text;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
export default Comment;
