import styles from './comment.module.scss';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CommentProps {}

export function Comment(props: CommentProps) {
  return (
    <OuterContainer>
      <RowOne>
        <Circle
          src={
            'https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352062-stock-illustration-default-placeholder-profile-icon.jpg'
          }
          alt={'profile pic'}
        />
        <NameandReply>
          <Name>Leyland Yang</Name>
          <Reply>reply</Reply>
        </NameandReply>
      </RowOne>
      <RowTwo>
        <Body>
          This is a comment from the judge, and everyone can see the comment
        </Body>
      </RowTwo>
      <RowThree>
        <TimeStamp>3 mins ago</TimeStamp>
      </RowThree>
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
  background: #161616;
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
  color: #9d9d9d;
  font-family: SF Pro Text;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const Body = styled.p`
  color: #fff;
  font-family: SF Pro Text;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.4px;
`;
const TimeStamp = styled.p`
  color: #9d9d9d;
  font-family: SF Pro Text;
  font-size: 17px;
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
