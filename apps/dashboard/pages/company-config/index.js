import styles from './index.module.css';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import Dropdown from './dropdown/dropdown';
import { useState } from 'react';
import Image from 'next/image';

const MockCompany = {
  image: '../img/memories/photo1.png',
  name: 'Company Name',
  website: 'https://www.google.com/',
};

export function CompanyConfig(props) {
  const [preferences, setPreferences] = useState({
    majors: [],
    grad: [],
  });

  return (
    <MainContainer>
      <Top>
        <CompanyPicture>
          <h1>Picture here</h1>
          <Image src={'/edit.png'} width={50} height={45} alt="edit" />
        </CompanyPicture>
        <CompanyDescription>
          <h1 className={styles['sponsor-font']}>{MockCompany.name}</h1>
          <h3>Company Description</h3>
          <p>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum
          </p>
          <h3>Company Website</h3>
          <a style={{ textDecoration: 'underline' }} href={MockCompany.website}>
            Website LInk
          </a>
        </CompanyDescription>
      </Top>
      <Bottom>
        <Dropdown label="Target Graduation Terms" />
        <Dropdown label="Target Majors" />
      </Bottom>
    </MainContainer>
  );
}
export default CompanyConfig;

const MainContainer = styled.div`
  width: 70%;
  height: 80%;
  margin: auto;
`;

const Top = styled.div`
  display: flex;
  height: 60%;
  margin: auto;
  justify-content: space-between;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 40%;
  /* margin: auto; */
`;

const CompanyPicture = styled.div`
  height: 50%;
  border: 5px solid white;
`;
const CompanyDescription = styled.div`
  display: flex;
  width: 60%;
  padding: 5px;
  flex-direction: column;
  justify-content: flex-start;
`;
