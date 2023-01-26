import React from 'react';
import styled from 'styled-components';
import { H2, Text } from '@hibiscus/ui';
import { GrayBox } from '../gray-box/gray-box';
import { Button, Combobox } from '@hibiscus/ui-kit-2023';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getOptionsGraduationYear } from '../../common/constants';
import APIService from '../../common/api';
import { getMLHMajors } from '../../common/utils';
import { Option } from '@hibiscus/types';
import { SpanRed } from '../red-span';
import { container } from 'tsyringe';
import { HibiscusSupabaseClient } from '@hibiscus/hibiscus-supabase-client';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

interface Props {
  closeModal: () => void;
}

function RSVPForm({ closeModal }: Props) {
  const { user, setUser } = useHibiscusUser();
  const formik = useFormik({
    initialValues: {
      school: '',
      major: '',
      graduationYear: '',
      resume: null,
    },
    validationSchema: Yup.object({
      school: Yup.string().required('Please enter your school'),
      major: Yup.string().required('Please enter your major'),
      graduationYear: Yup.string().required(
        'Please enter your graduation year'
      ),
    }),
    onSubmit: async (values, formikHelpers) => {
      closeModal();
      // TODO: submit values
      const supabase = container.resolve(HibiscusSupabaseClient);
      const client = supabase.getClient();
      const { error } = await client
        .from('user_profiles')
        .update({ attendance_confirmed: true })
        .eq('user_id', user.id);
      if (error) {
        console.error(error.message);
        return;
      }
      const res = await client.from('participants').upsert({
        id: user.id,
        graduation_year: values.graduationYear,
        major: values.major,
        school: values.school,
      });
      if (res.error) {
        console.error(error.message);
        return;
      }
      setUser((prev) => ({ ...prev, attendanceConfirmed: true }));
    },
  });

  const createHandlerClickChooseOption = (
    field: keyof (typeof formik)['initialValues']
  ) => {
    return (_, opt: Option) =>
      formik.setValues((prev) => ({ ...prev, [field]: opt.displayName }));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <OwnGrayBox>
        <H2>Fill in details below</H2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ zIndex: 2 }}>
            <Text>Your school:</Text>
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
            <SpanRed>{formik.errors.school}</SpanRed>
          </div>
          <div>
            <Text>Your graduation date:</Text>
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
            <SpanRed>{formik.errors.graduationYear}</SpanRed>
          </div>
        </div>
        <div>
          <Text>Your major:</Text>
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
        <Button color="blue" type="submit">
          SUBMIT AND CONFIRM YOUR SPOT!
        </Button>
      </OwnGrayBox>
    </form>
  );
}

export default RSVPForm;

const OwnGrayBox = styled(GrayBox)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
