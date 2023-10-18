import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H2, Text } from '@hibiscus/ui';
import { GrayBox } from '../gray-box/gray-box';
import { Button, Checkbox, DatePicker } from '@hibiscus/ui-kit-2023';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SpanRed } from '../red-span';
import { useHibiscusSupabase } from '@hibiscus/hibiscus-supabase-context';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';
import { toast } from 'react-hot-toast';
import * as Sentry from '@sentry/browser';
import axios from 'axios';
import { getEnv } from '@hibiscus/env';

interface Props {
  closeModal: () => void;
}

function RSVPForm({ closeModal }: Props) {
  const { user, updateUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  const [discordInvite, setDiscordInvite] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      // fetch discord invite URL
      const res = await axios.get(
        `${getEnv().Hibiscus.Discord.ApiUrl}/getUserInvite/${user.id}`
      );

      console.log(res.data);

      setDiscordInvite('PLACEHOLDER');
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      dob: '',
      acknowledgementInPerson: false,
      acknowledgementDiscord: false,
    },

    validationSchema: Yup.object({
      acknowledgementInPerson: Yup.boolean()
        .isTrue('This field is required')
        .required('This field is required'),

      dob: Yup.date()
        .required('This field is required')
        .max(
          new Date(2005, 11, 4),
          'You must be 18 years old or above to join this event'
        )
        .typeError('Invalid date provided'),

      acknowledgementDiscord: Yup.boolean()
        .isTrue('This field is required')
        .required('This field is required'),
    }),

    validate: async (values) => {
      // get discord status from API
      const res = await axios.get(
        `${getEnv().Hibiscus.Discord.ApiUrl}/checkUserInDiscord/${user.id}`
      );
      if (res.status === 500) {
        return {
          acknowledgementDiscord:
            'An error occured while trying to query Discord status. If this error persists, please contact team@hacksc.com for further assistance',
        };
      }

      const joinedDiscord = res.data.inDiscord;
      if (!joinedDiscord) {
        return {
          acknowledgementDiscord:
            'We could not detect your account in the HackSC X Discord server',
        };
      }

      return {};
    },

    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      closeModal();
      try {
        const client = supabase.getClient();

        // update confirmation
        const { error } = await client
          .from('user_profiles')
          .update({ attendance_confirmed: true })
          .eq('user_id', user.id);
        if (error) {
          throw error;
        }
        updateUser({ attendanceConfirmed: true });
        toast.success('Confirmation received! Welcome to HackSC X 🌺', {
          icon: '🎉',
        });
        formikHelpers.setSubmitting(false);
      } catch (e) {
        Sentry.captureException(e);
        toast.error(
          'Oops! Something went wrong with submitting your RSVP. Please try again or contact us if this problem persists.'
        );
      }
    },
  });

  return (
    <form>
      <OwnGrayBox>
        <H2>Please confirm some details</H2>

        <QuestionWrap>
          <label htmlFor="dob">
            <Text>
              Date of birth (remember to bring your government ID to verify
              this):
              <SpanRed>*</SpanRed>
            </Text>
          </label>
          <DatePicker
            name="dob"
            id="dob"
            valueOneLineText={formik.values.dob}
            placeholder="in MM/DD/YYYY format e.g 12/22/2002"
            onChange={formik.handleChange}
            onClickDay={(d) => {
              formik.setFieldValue('dob', d);
            }}
          />
          {formik.touched.dob && formik.errors.dob ? (
            <SpanRed>{formik.errors.dob}</SpanRed>
          ) : null}
        </QuestionWrap>

        <QuestionWrap>
          <Checkbox
            onInput={(newVal) => {
              formik.setFieldValue('acknowledgementInPerson', newVal);
            }}
            label={
              <Text>
                By RSVPing, I confirm that I will be attending HackSC X
                in-person. Below are the opening and closing ceremony times:
                <SpanRed>*</SpanRed>
              </Text>
            }
          />
          {formik.touched.acknowledgementInPerson &&
            formik.errors.acknowledgementInPerson && (
              <SpanRed>{formik.errors.acknowledgementInPerson}</SpanRed>
            )}
        </QuestionWrap>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Opening Ceremony:</span>
            <Text>Sat, Nov 4 @ 1:00pm - MG Studio</Text>
          </Text>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Closing Ceremony:</span>
            <Text>Sun, Nov 5 @ 4:00pm - MG Studio</Text>
          </Text>
        </div>

        <QuestionWrap>
          <Checkbox
            onInput={(newVal) => {
              formik.setFieldValue('acknowledgementDiscord', newVal);
            }}
            label={
              <Text>
                I confirm that I have joined the official Discord server for
                HackSC X at <a href={discordInvite}>{discordInvite}</a>
                <SpanRed>*</SpanRed>
              </Text>
            }
          />
          {formik.touched.acknowledgementDiscord && (
            <SpanRed>{formik.errors.acknowledgementDiscord}</SpanRed>
          )}
        </QuestionWrap>

        <Button
          color="blue"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
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
  max-height: 40rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
`;

const QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
