import React, { useState } from 'react';
import styled from 'styled-components';
import { H2, Text } from '@hibiscus/ui';
import { GrayBox } from '../gray-box/gray-box';
import { Button, Combobox } from '@hibiscus/ui-kit-2023';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ALLOWED_RESUME_FORMATS,
  getOptionsGraduationYear,
} from '../../common/constants';
import APIService from '../../common/api';
import { getMLHMajors } from '../../common/utils';
import { Option } from '@hibiscus/types';
import { SpanRed } from '../red-span';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { toast } from 'react-hot-toast';
import { getEnv } from '@hibiscus/env';
import mime from 'mime-types';

interface Props {
  closeModal: () => void;
}

function RSVPForm({ closeModal }: Props) {
  const { user, updateUser } = useHibiscusUser();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const formik = useFormik({
    initialValues: {
      school: '',
      major: '',
      graduationYear: '',
    },
    validationSchema: Yup.object({
      school: Yup.string().required('Please enter your school'),
      major: Yup.string().required('Please enter your major'),
      graduationYear: Yup.string().required(
        'Please enter your graduation year'
      ),
    }),
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      closeModal();
      const supabase = container.resolve(HibiscusSupabaseClient);
      const client = supabase.getClient();
      // upload resume
      let resumeStoragePath: string | null = null;
      if (resumeFile !== null) {
        const fileKey = `resume.${mime.extension(resumeFile.type)}`;
        const storageResponse = await client.storage
          .from(getEnv().Hibiscus.RSVPForm.ResumeStorageBucketName)
          .upload(`${user.id}/${fileKey}`, resumeFile);
        if (storageResponse.error) {
          console.error(storageResponse.error.message);
        } else {
          resumeStoragePath = storageResponse.data.path;
        }
      }
      // update participants information
      const res = await client.from('participants').upsert({
        id: user.id,
        graduation_year: values.graduationYear,
        major: values.major,
        school: values.school,
        resume: resumeStoragePath,
      });
      if (res.error) {
        console.error(res.error.message);
      }
      // update confirmation
      const { error } = await client
        .from('user_profiles')
        .update({ attendance_confirmed: true })
        .eq('user_id', user.id);
      if (error) {
        console.error(error.message);
        return;
      }
      updateUser({ attendanceConfirmed: true });
      toast.success('Confirmation received! Welcome to HackSC 2023 🌺', {
        icon: '🎉',
      });
      formikHelpers.setSubmitting(false);
    },
  });

  const createHandlerClickChooseOption = (
    field: keyof (typeof formik)['initialValues']
  ) => {
    return (_, opt: Option) =>
      formik.setValues((prev) => ({ ...prev, [field]: opt.displayName }));
  };

  const handleResumeFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.files.length === 0) {
      setResumeFile(null);
      return;
    }
    setResumeFile(e.target.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <OwnGrayBox>
        <H2>Please confirm some details</H2>
        <Text>
          To validate you when you come to HackSC 2023, please enter details
          below. We use this information to check you in when you first check-in
          with us for the event on February 3rd.
        </Text>
        <div style={{ zIndex: 2 }}>
          <label htmlFor="school">
            <Text>
              Your school:<SpanRed>*</SpanRed>{' '}
            </Text>
          </label>
          <Combobox
            key="1"
            name="school"
            id="school"
            limitDropdownItems={10}
            value={formik.values.school}
            placeholder="e.g University of Southern California"
            options={async () => {
              const schools = await APIService.getSchools();
              return schools.map((school) => ({
                value: school,
                displayName: school,
              }));
            }}
            onChange={formik.handleChange}
            onClickChooseOption={createHandlerClickChooseOption('school')}
          />
          {formik.touched.school && <SpanRed>{formik.errors.school}</SpanRed>}
        </div>
        <div style={{ zIndex: 1 }}>
          <label htmlFor="graduationYear">
            <Text>
              Your graduation date:<SpanRed>*</SpanRed>
            </Text>
          </label>
          <Combobox
            key="2"
            name="graduationYear"
            id="graduationYear"
            value={formik.values.graduationYear}
            options={getOptionsGraduationYear()}
            placeholder="e.g Spring 2023, Fall 2024"
            onChange={formik.handleChange}
            onClickChooseOption={createHandlerClickChooseOption(
              'graduationYear'
            )}
          />
          {formik.touched.graduationYear && (
            <SpanRed>{formik.errors.graduationYear}</SpanRed>
          )}
        </div>
        <div style={{ zIndex: 0 }}>
          <label htmlFor="major">
            <Text>
              Your major:
              <SpanRed>*</SpanRed>
            </Text>
          </label>
          <Combobox
            key="3"
            name="major"
            id="major"
            value={formik.values.major}
            options={getMLHMajors()}
            placeholder="e.g computer science"
            onChange={formik.handleChange}
            onClickChooseOption={createHandlerClickChooseOption('major')}
          />
          {formik.touched.major && <SpanRed>{formik.errors.major}</SpanRed>}
        </div>
        <div>
          <label>
            <Text>Your resume:</Text>
          </label>
          <input
            type="file"
            onChange={handleResumeFileChange}
            accept={ALLOWED_RESUME_FORMATS.map((it) => mime.lookup(it)).join(
              ','
            )}
          />
        </div>
        <Button color="blue" type="submit">
          SUBMIT AND CONFIRM YOUR SPOT!
        </Button>
      </OwnGrayBox>
    </form>
  );
}

export default RSVPForm;

const OwnGrayBox = styled(GrayBox)`
  text-align: center;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
`;
