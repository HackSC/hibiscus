import styled from 'styled-components';

/* eslint-disable-next-line */
export interface PointrProps {}

const StyledPointr = styled.div`
  background-color: #d9d9d9;
  width: 70%;
  display: flex;
  justify-content: space-around;
`;

export function Pointr(props: PointrProps) {
  return (
    <StyledPointr>
      <FormContainer>
        <Form>
          <label htmlFor="URLfrom">URL from (new URL):</label>
          <input type="text" id="URLfrom" name="URLfrom" />
          <label htmlFor="URLto">URL to:</label>
          <input type="text" id="URLto" name="URLto" />
          <input type="submit" id="submit" />
        </Form>
      </FormContainer>

      <UrlBox>
        <p className="urltext">Current URLs</p>
        <p className="urltext">hack.sc/businesscard - &gt; hacksc.com</p>
      </UrlBox>
    </StyledPointr>
  );
}

export default Pointr;
const FormContainer = styled.div`
  width: 45%;
  display: flex;
  justify-content: right;
`;
const Form = styled.form`
  position: relative;
  bottom: 10%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
`;
const UrlBox = styled.div`
  background-color: #666666;
  width: 47%;
  height: 95%;
  margin: auto;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
`;
