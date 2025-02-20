import React, { useEffect, useState } from 'react';
import EditProfileCard from '../../components/hacker-profile/edit-profile-card';
import styled from 'styled-components';

import Star4 from '../../components/svg/star-4';
import { GrEdit } from 'react-icons/gr';

import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

export function Index() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useHibiscusUser();
  const handlePfpEdit = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    const data = await fetch(
      '/api/hacker-profile/profile-picture/upload/' + user.id,
      {
        method: 'POST',
        body: formData,
      }
    );
    const response = await data.json();

    if (response.success) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleResumeUpload = async (event) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    const data = await fetch('/api/hacker-profile/resume/upload/' + user.id, {
      method: 'POST',
      body: formData,
    });
    const response = await data.json();

    if (response.success) {
      alert('Resume uploaded successfully');
      window.location.reload();
    }
  };

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [school, setSchool] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/hacker-profile');
      let data = await response.json();
      data = data.data;
      setName(data.first_name + ' ' + data.last_name);
      setUsername(data.username || '');
      setFieldOfStudy(data.major || '');
      setProfileBio(data.bio || '');
      setSchool(data.school || '');
      setGraduationYear(data.graduation_year || '');
    };

    const fetchProfileImage = async () => {
      const response = await fetch(
        '/api/hacker-profile/profile-picture/get-url/' + user.id
      );
      let data = await response.json();
      data.exist && setProfileImage(data.url);
    };

    const fetchResume = async () => {
      const response = await fetch(
        '/api/hacker-profile/resume/get-resume/' + user.id
      );
      const data = await response.json();
      data.exist && setResume(data.url);
    };

    fetchData();
    fetchProfileImage();
    fetchResume();
  }, []);

  if (name === '') {
    return <LayoutContainer>Loading...</LayoutContainer>;
  }

  return (
    <LayoutContainer>
      {isEditing && <EditProfileCard onClose={() => setIsEditing(false)} />}
      <Body>
        <BasicInfoContainer>
          <ProfileImageContainer>
            <ProfileImage src={profileImage || ''} />
            <EditIconButton
              onClick={() => document.getElementById('imageUpload').click()}
            >
              <GrEdit size="17px" />

              <input
                type="file"
                id="imageUpload"
                accept="image/jpeg"
                style={{ display: 'none' }}
                onChange={handlePfpEdit}
              />
            </EditIconButton>
          </ProfileImageContainer>

          <ProfileBox>
            <UserName>{name}</UserName>

            {!isEditing && (
              <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
            )}
          </ProfileBox>

          <InfoRow>
            <InfoItem>
              <Label>School</Label>
              <InfoText>{school}</InfoText>
            </InfoItem>
            <InfoItem>
              <Label>Field Of Study</Label>
              <InfoText>{fieldOfStudy}</InfoText>
            </InfoItem>
            <InfoItem>
              <Label>Graduating</Label>
              <InfoText>
                {graduationYear &&
                  graduationYear[0].toUpperCase() + graduationYear.slice(1)}
              </InfoText>
            </InfoItem>
          </InfoRow>
        </BasicInfoContainer>

        <div
          style={{
            border: '1px solid',
            width: '60%',
            color: '#989898',
            marginBottom: '2rem',
          }}
        />
        <AboutContainer>
          <Header3>About Me</Header3>
          <TextBox>{profileBio}</TextBox>
        </AboutContainer>
        <Header3>Resume</Header3>
        {resume && (
          <a href={resume} target="_blank">
            View Resume
          </a>
        )}
        <ResumeButton
          onClick={() => document.getElementById('resumeUpload').click()}
        >
          <input
            type="file"
            id="resumeUpload"
            accept="application/pdf"
            style={{ display: 'none' }}
            onChange={handleResumeUpload}
          />{' '}
          Upload Resume
        </ResumeButton>
      </Body>

      <Star4Container>
        <Star4 />
      </Star4Container>
    </LayoutContainer>
  );
}

export default Index;

const ProfileImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid black;
  background-color: #d9d9d9;
  position: absolute;
  left: 50px;
  margin-right: 50px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditIconButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  cursor: pointer;

  label {
    cursor: pointer;
  }
`;

const BasicInfoContainer = styled.div``;

const UserName = styled.h2`
  font-size: 38px;
  margin-bottom: 30px;
  color: black;
  font-weight: bold;
  margin-left: 0;
  padding-right: 30px;
  text-wrap: nowrap;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 40px;
`;

const Label = styled.span`
  color: #fe6447;
  font-weight: bold;
`;

const InfoText = styled.span`
  color: black;
`;

const DividerLine = styled.hr`
  width: 85%;
  border: 10;
  height: 10px;
  color: #989898;
  margin: 20px 0;
  z-index: 10;
`;

const AboutContainer = styled.div`
  margin-bottom: 20px;
`;

const TextBox = styled.div``;

const Star4Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0px;
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  z-index: 0;
`;

const Header3 = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: #f5f5f5;

  padding-left: 250px;
`;

const LayoutContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  background-color: #f5f5f5;
  flex-direction: column;
  padding: 40px;
`;

const ProfileBox = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  background-color: #f5f5f5;
  border-radius: 10px;
  width: 50%;
`;

const ProfileText = styled.h2`
  margin-right: 20px;
  font-weight: bold;
`;

const EditButton = styled.button`
  padding: 10px 25px;
  margin-top: 0;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  z-index: 2;
  cursor: pointer;
  float: right;
  margin-bottom: 13px;
`;

const ResumeButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #ff6347;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
`;
