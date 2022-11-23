import styled from 'styled-components';
import {
  BlackButton,
  BlueButton,
  PurpleButton,
  OneLineText,
  ParagraphText,
  InformationEnter,
  Confirmation,
  Search,
  Checkbox,
  Radio,
  Switch,
  Slider,
  Increment,
} from '@hacksc-platforms/ui-kit-2023';

export default function UITest() {
  return (
    <MainWrapper>
      <BlackButton label="UNCLICKED"></BlackButton>
      <BlueButton label="UNCLICKED"></BlueButton>
      <PurpleButton label="UNCLICKED"></PurpleButton>
      <OneLineText label="One Line Text"></OneLineText>
      <ParagraphText label="paragraph"></ParagraphText>
      <InformationEnter label="test"></InformationEnter>
      <Confirmation></Confirmation>
      <Search></Search>
      <Checkbox label="check 1"></Checkbox>
      <form>
        <Radio label="option 1"></Radio>
        <Radio label="option 2"></Radio>
      </form>
      <form>
        <Radio label="option 3"></Radio>
        <Radio label="option 4"></Radio>
      </form>
      <Switch label="hellasdfasdfasdfdsao"></Switch>
      <Slider></Slider>
      <Increment></Increment>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 100vh;
  background: white;
  background-position: fixed;
  background-attachment: local;
  background-repeat: no-repeat;
  background-size: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: black;
  gap: 30px;
`;
