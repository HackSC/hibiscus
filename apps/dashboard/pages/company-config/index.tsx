/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @next/next/no-img-element */
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
import axios from 'axios';
import useHibiscusUser from 'apps/dashboard/hooks/use-hibiscus-user/use-hibiscus-user';
import { useRouter } from 'next/router';
import { SponsorServiceAPI } from '../../common/api';
import { Company } from '../../common/mock-sponsor';

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
  const [companyId, setCompanyId] = useState('');
  const [companyProfile, setCompanyProfile] = useState<Company | null>(null);

  const { user } = useHibiscusUser();

  const [MockCompany, setMockCompany] = useState({
    id: '',
    image: '../img/memories/photo1.png',
    name: 'Company Name',
    website: 'https://www.google.com/',
    description:
      'lorem ipsume description description description description description description description description ',
  });

  // edit company description, website modal
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      SponsorServiceAPI.getCompanyIdAndEventId(user.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }
          setCompanyId(data.data.company_id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function fetchCompany() {
      SponsorServiceAPI.getCompanyProfile(companyId)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          }
          console.log(data.data);
          setCompanyProfile(data.data as Company);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
    fetchCompany();
  }, []);

  async function changeData() {
    const res = await axios.put(`/api/company/${MockCompany.id}`, {
      description: MockCompany.description,
      profile_photo: '',
      target_graduation_terms: [],
      target_majors: [],
    });
  }

  return (
    <MainContainer>
      <Modal
        isOpen={modal}
        closeModal={() => {
          setModal(false);
        }}
      >
        {/* <EditForm
          companyName={companyProfile.name}
          companyWebsite={companyProfile.website}
          companyDescription={companyProfile.description}
          setMockCompany={setMockCompany}
          MockCompay={MockCompany}
          setModal={setModal}
        /> */}
      </Modal>

      <Top>
        {/* Profile image */}
        <CompanyPicture className={styles['company-pic']}>
          <img src={'/googleLog.png'} alt={'google'} />
        </CompanyPicture>

        {/* Company info */}
        <CompanyDescription>
          <h1 className={styles['sponsor-font']}>
            {companyProfile ? 'test' : 'failed'}
          </h1>
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

      {/* <Bottom>
        <Dropdown
          key={3}
          options={graduation}
          label="Target Graduation Terms"
        />
        <Dropdown key={1} options={majors} label="Target Majors" />
      </Bottom> */}
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
  position: absolute;
  z-index: 5;
  right: 45%; // why
  top: 45%;
`;

const MainContainer = styled.div`
  width: 70%;
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
`;

const CompanyPicture = styled.div`
  height: 250px;
  border: 5px solid white;
  box-sizing: border-box;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  width: 250px;
  display: flex;
  align-items: center;
  > img {
    width: 250px;
  }
`;
const CompanyDescription = styled.div`
  display: flex;
  width: 65%;
  flex-direction: column;
  justify-content: flex-start;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;
