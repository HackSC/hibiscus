import styled from 'styled-components';
import Select, { StylesConfig } from 'react-select';
import { IoMdClose } from 'react-icons/io';

import { SCHOOLS } from '../../common/schools';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

const EditProfileCard = ({ onClose }) => {
  const options = [
    { value: 'fall 2024', label: 'Fall 2024' },
    { value: 'spring 2025', label: 'Spring 2025' },
    { value: 'fall 2025', label: 'Fall 2025' },
    { value: 'spring 2026', label: 'Spring 2026' },
    { value: 'fall 2026', label: 'Fall 2026' },
    { value: 'spring 2027', label: 'Spring 2027' },
    { value: 'fall 2027', label: 'Fall 2027' },
    { value: 'spring 2028', label: 'Spring 2028' },
    { value: 'fall 2028', label: 'Fall 2028' },
    { value: 'spring 2029', label: 'Spring 2029' },
    { value: 'fall 2029', label: 'Fall 2029' },
    { value: 'spring 2030', label: 'Spring 2030' },
  ];

  const schoolOptions = SCHOOLS.map((school) => ({
    value: school,
    label: school,
  }));

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [profileBio, setProfileBio] = useState('');
  const [school, setSchool] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

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
      formik.setFieldValue('name', data.first_name + ' ' + data.last_name);
      formik.setFieldValue('username', data.username);
      formik.setFieldValue('fieldOfStudy', data.major);
      formik.setFieldValue('profileBio', data.bio);
      formik.setFieldValue('school', data.school);
      formik.setFieldValue('graduationYear', data.graduation_year);
    };

    fetchData();
  }, []);

  const updatePasswordHandler = (password) => {
    fetch('/api/hacker-profile/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Success') {
          onClose();
        } else {
          alert('There was an error updating your password');
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      fieldOfStudy: '',
      password: '',
      profileBio: '',
      school: '',
      graduationYear: '',
    },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const update = {};

      if (values.fieldOfStudy === null || values.fieldOfStudy == undefined)
        values.fieldOfStudy = '';
      if (values.profileBio === null || values.fieldOfStudy == undefined)
        values.profileBio = '';
      if (values.username === null || values.username == undefined)
        values.username = '';
      if (values.graduationYear === null || values.graduationYear == undefined)
        values.graduationYear = '';
      if (values.school === null || values.school == undefined)
        values.school = '';

      if (values.name !== name) {
        update['newName'] = values.name;
      }
      if (values.fieldOfStudy != fieldOfStudy) {
        update['newFieldOfStudy'] = values.fieldOfStudy;
      }
      if (values.profileBio != profileBio) {
        update['newBio'] = values.profileBio;
      }
      if (values.username != username) {
        update['newUsername'] = values.username;
      }
      if (values.graduationYear != graduationYear) {
        update['newGradYear'] = values.graduationYear;
      }
      if (values.school != school) {
        update['newSchool'] = values.school;
      }

      if (values.password !== '') {
        updatePasswordHandler(values.password);
      }

      if (Object.keys(update).length > 0) {
        fetch('/api/hacker-profile/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(update),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'Success') {
              onClose();
            } else {
              alert('There was an error updating your profile');
            }
          });
      }
      formikHelpers.setSubmitting(false);
      window.location.reload();
    },
  });

  return (
    <ModalOverlay>
      <ModalContainer className="modal-profile">
        {/*close x button
         */}
        <IoMdClose color="black" size={25} onClick={onClose} />
        <SaveButton
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
          type="submit"
        >
          Save
        </SaveButton>
        <FormContainer>
          <InfoRow>
            <FieldLabel>Name</FieldLabel>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder={formik.values.name}
              onChange={formik.handleChange}
            />
          </InfoRow>

          <InfoRow>
            <FieldLabel>Username</FieldLabel>
            <Input
              name="username"
              id="username"
              type="text"
              placeholder={formik.values.username || 'Enter a username'}
              onChange={formik.handleChange}
            />
          </InfoRow>
        </FormContainer>

        <FormContainer>
          <InfoRow>
            <FieldLabel>Field of Study</FieldLabel>
            <Input
              name="fieldOfStudy"
              id="fieldOfStudy"
              type="text"
              placeholder={formik.values.fieldOfStudy || 'Enter your major'}
              onChange={formik.handleChange}
            />
          </InfoRow>

          <InfoRow>
            <FieldLabel>Profile Bio</FieldLabel>
            <Input
              name="profileBio"
              id="profileBio"
              type="text"
              placeholder={formik.values.profileBio || 'Enter your bio'}
              onChange={formik.handleChange}
            />
          </InfoRow>
          {/* <InfoRow>
            <FieldLabel>Password</FieldLabel>
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="************"
              onChange={formik.handleChange}
            />
          </InfoRow> */}
        </FormContainer>

        <FormContainer>
          <InfoRow>
            <FieldLabel>School</FieldLabel>
            <Select
              name="school"
              id="school"
              placeholder={formik.values.school || 'Select your school'}
              onChange={(e) => {
                formik.setFieldValue('school', e.value);
              }}
              options={schoolOptions}
              menuPlacement="auto"
              menuPortalTarget={
                document.getElementsByClassName(
                  'modal-profile'
                )[0] as HTMLElement
              }
              menuPosition={'fixed'}
              menuShouldScrollIntoView={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,

                  backgroundColor: '#f5f5f5',
                  borderBottom: 'solid #7E7E7E 2px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'flex-start',
                  minHeight: '40px',
                  borderRadius: '8px',
                  height: 'auto',
                }),
                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'black',
                  borderRadius: '8px',
                }),
                singleValue: (baseStyles) => ({
                  ...baseStyles,
                  whiteSpace: 'normal',
                  display: 'inline-block',
                }),

                menuList: (baseStyles, state) => ({
                  ...baseStyles,
                  maxHeight: '115px',
                  overflowY: 'auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#FF9966' : '#f5f5f5', // Change hover color
                  color: 'black',
                  cursor: 'pointer',
                  display: 'flex',
                  flexWrap: 'wrap',
                }),
              }}
            />
          </InfoRow>
          <InfoRow>
            <FieldLabel>Graduation Year</FieldLabel>
            <Select
              name="graduationYear"
              id="graduationYear"
              options={options}
              placeholder={
                formik.values.graduationYear
                  ? formik.values.graduationYear[0].toUpperCase() +
                    formik.values.graduationYear.slice(1)
                  : 'Select your year'
              }
              onChange={(e) => {
                formik.setFieldValue('graduationYear', e.value);
              }}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              menuShouldScrollIntoView={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,

                  backgroundColor: '#f5f5f5',
                  borderBottom: 'solid #7E7E7E 2px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  width: '28vh',
                  borderRadius: '8px',
                }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),

                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'black',
                  borderRadius: '8px',
                  zIndex: 9999,
                }),
                menuList: (baseStyles, state) => ({
                  ...baseStyles,
                  maxHeight: '115px',
                  overflowY: 'auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  zIndex: 9999,
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#FF9966' : '#f5f5f5', // Change hover color
                  color: 'black',
                  cursor: 'pointer',
                }),
              }}
            />
          </InfoRow>
        </FormContainer>

        <FormContainer>
          {/* <InfoRow>
            <FieldLabel>Graduation Year</FieldLabel>
            <Select
              name="graduationYear"
              id="graduationYear"
              options={options}
              placeholder={
                formik.values.graduationYear !== '' ? formik.values.graduationYear[0].toUpperCase() +
                  formik.values.graduationYear.slice(1) : 'Select your year'
              }
              onChange={(e) => {
                formik.setFieldValue('graduationYear', e.value);
              }}
              menuPlacement="auto"
              menuPortalTarget={document.body}
              menuPosition={'fixed'}
              menuShouldScrollIntoView={true}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,

                  backgroundColor: '#f5f5f5',
                  borderBottom: 'solid #7E7E7E 2px',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  width: '28vh',
                  borderRadius: '8px',
                }),

                menu: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'black',
                  zIndex: 9999,
                  borderRadius: '8px',
                }),
                menuList: (baseStyles, state) => ({
                  ...baseStyles,
                  maxHeight: '115px',
                  overflowY: 'auto',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isFocused ? '#FF9966' : '#f5f5f5', // Change hover color
                  color: 'black',
                  cursor: 'pointer',
                }),
              }}
            />
          </InfoRow> */}
        </FormContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default EditProfileCard;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalContainer = styled.div`
  background-color: #f5f5f5;
  padding: 50px;
  width: 700px;
  max-height: 700px;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  flex-shrink: 0;
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  padding: 5px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 35px;
  max-height: 71px;
`;

const FieldLabel = styled.label`
  font-weight: bold;
  color: #ff6347;
  margin-bottom: 8px;
`;

const SaveButton = styled.button`
  position: absolute;
  top: 40px;
  right: 40px;
  padding: 10px 20px;
  margin-top: 0;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 8px;
  background-color: #f5f5f5;

  font-size: 14px;
  width: 200px;
  border-bottom: solid 1px;
  border-bottom-color: #7e7e7e;
`;
