import styles from './index.module.css';
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import Dropdown from './dropdown/dropdown';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import { Modal } from '@hibiscus/ui';
import EditForm from './EditForm';
import UploadImage from '../UploadImage';

const graduation = [
  'Spring 2024',
  'Fall 2024',
  'Spring 2025',
  'Fall 2025',
  'Spring 2026',
  'Fall 2026',
  'Spring 2027',
  'Fall 2027',
  'Spring 2028',
];

const majors = [
  'Computer Science',
  'Computer Engineering',
  'Software Engineering',
  'Electrical Engineering',
  'Other',
];

export function CompanyConfig(props) {
  const [preferences, setPreferences] = useState({
    majors: [],
    grad: [],
  });

  const [MockCompany, setMockCompany] = useState({
    image: '../img/memories/photo1.png',
    name: 'Company Name',
    website: 'https://www.google.com/',
    description:
      'lorem ipsume description description description description description description description description ',
  });

  const [modal, setModal] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const inputFile = useRef(null);

  function handleWebsite(e) {
    setMockCompany({
      ...MockCompany,
      website: e.target.value,
    });
  }

  function handleDescription(e) {
    setMockCompany({
      ...MockCompany,
      description: e.target.value,
    });
  }

  useEffect(() => {
    console.log('Updating target graduation terms and graduation');
  }, [preferences]);

  return (
    <MainContainer>
      <Modal
        isOpen={modal}
        closeModal={() => {
          setModal(false);
        }}
      >
        <EditForm
          companyName={MockCompany.name}
          companyWebsite={MockCompany.website}
          companyDescription={MockCompany.description}
          handleWebsite={handleWebsite}
          handleDescription={handleDescription}
          setModal={setModal}
        />
      </Modal>
      <Modal
        isOpen={uploadImage}
        closeModal={() => {
          setUploadImage(false);
        }}
      >
        <UploadImage setUploadImage={setUploadImage} />
      </Modal>
      <Top>
        <CompanyPicture>
          <Image fill src={'/googleLog.png'} alt={'google'} />
          <CenterImageContainer>
            <Image
              width={20}
              height={20}
              src={'/edit.svg'}
              alt="edit"
              onClick={() => setUploadImage(true)}
            />
          </CenterImageContainer>
        </CompanyPicture>
        <CompanyDescription>
          <h1 className={styles['sponsor-font']}>{MockCompany.name}</h1>
          <Flex>
            <div className={styles['full-width']}>
              <RightImageContainer>
                <h3 className={styles['inline-block']}>Company Description</h3>
                <a
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    console.log('hello');
                    setModal(true);
                  }}
                >
                  <Image
                    width={20}
                    height={20}
                    src={'/edit.svg'}
                    alt="edit"
                    className={styles['inline-block']}
                    onClick={console.log('CLicked')}
                  />
                </a>
              </RightImageContainer>
              <p>{MockCompany.description}</p>
            </div>
          </Flex>
          <Flex>
            <div className={styles['full-width']}>
              <h3>Company Website</h3>

              <a
                style={{ textDecoration: 'underline' }}
                href={MockCompany.website}
              >
                {MockCompany.website}
              </a>
            </div>
          </Flex>
        </CompanyDescription>
      </Top>
      <Bottom>
        <Dropdown
          key={3}
          options={graduation}
          label="Target Graduation Terms"
        />
        <Dropdown key={1} options={majors} label="Target Majors" />
      </Bottom>
    </MainContainer>
  );
}
export default CompanyConfig;

const RightImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CenterImageContainer = styled.div`
  border: 3px solid blue;
  position: absolute;
  z-index: 5;
  right: 150px;
  top: 100px;
`;

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
  height: 200px;
  border: 5px solid white;
  position: relative;
  width: 250px;
`;
const CompanyDescription = styled.div`
  display: flex;
  width: 60%;
  padding: 5px;
  flex-direction: column;
  justify-content: flex-start;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;
