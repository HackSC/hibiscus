import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H2, H3, Text } from '@hibiscus/ui';
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

const ERROR_STRING =
  'An error occured while trying to query Discord status. If this error persists, please contact team@hacksc.com for further assistance';

interface Props {
  closeModal: () => void;
}

function RSVPForm({ closeModal }: Props) {
  // const [discordToken, setDiscordToken] = useState<string | null>(null);
  const { user, updateUser } = useHibiscusUser();
  const { supabase } = useHibiscusSupabase();

  const discordInvite = getEnv().Hibiscus.Discord.InviteUrl;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (user != null) {
  //       try {
  //         const token = await axios.get(`/api/discord/${user.id}`);
  //         setDiscordToken(token.data.token);
  //       } catch {
  //         setDiscordToken('ERROR');
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [user]);

  const formik = useFormik({
    initialValues: {
      dob: '',
      acknowledgementInPerson: false,
      acknowledgementDiscord: false,
      // acknowledgementWaiver: false,
      acknowledgementPacket: false,
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

      // acknowledgementWaiver: Yup.boolean()
      //   .isTrue('This field is required')
      //   .required('This field is required'),

      acknowledgementPacket: Yup.boolean()
        .isTrue('This field is required')
        .required('This field is required'),
    }),

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
        toast.success('Confirmation received! Welcome to SoCal Tech Week 🌺', {
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
        {discordInvite ? (
          <>
            <Heading3>Please confirm some details</Heading3>

            <QuestionWrap>
              <label htmlFor="dob">
                <TextBody>
                  Date of birth (remember to bring your government ID to verify
                  this):
                  <SpanRed>*</SpanRed>
                </TextBody>
              </label>
              <DatePickerOwn
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
                color="red"
                onInput={(newVal) => {
                  formik.setFieldValue('acknowledgementInPerson', newVal);
                }}
                label={
                  <TextBody>
                    By RSVPing, I confirm that I will be attending SoCal Tech
                    Week in-person. Below are the opening and closing ceremony
                    times:
                    <SpanRed>*</SpanRed>
                  </TextBody>
                }
              />
              {formik.touched.acknowledgementInPerson &&
                formik.errors.acknowledgementInPerson && (
                  <SpanRed>{formik.errors.acknowledgementInPerson}</SpanRed>
                )}
            </QuestionWrap>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <TextBody>
                <span style={{ fontWeight: 'bold' }}>Opening Ceremony:</span>
                <TextBody>
                  Sat, Nov 9 @ 12:00pm - RTCC Trojan Grand Ballroom
                </TextBody>
              </TextBody>
              <TextBody>
                <span style={{ fontWeight: 'bold' }}>Closing Ceremony:</span>
                <TextBody>
                  Sun, Nov 10 @ 4:30pm - RTCC Trojan Grand Ballroom
                </TextBody>
              </TextBody>
            </div>

            <QuestionWrap>
              <Checkbox
                color="red"
                onInput={(newVal) => {
                  formik.setFieldValue('acknowledgementDiscord', newVal);
                }}
                label={
                  <TextBody>
                    I confirm that I have joined the official Discord server for
                    SoCal Tech Week at{' '}
                    <a
                      href={`https://discord.gg/${discordInvite}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      discord.gg/{discordInvite}
                    </a>
                    <SpanRed>*</SpanRed>
                  </TextBody>
                }
              />
              {/* <TextBody>
                Your Discord verification token is{' '}
                {discordToken ? discordToken : '...Loading...'}
              </TextBody> */}
              {formik.touched.acknowledgementDiscord && (
                <SpanRed>{formik.errors.acknowledgementDiscord}</SpanRed>
              )}
            </QuestionWrap>

            {/* <QuestionWrap>
              <Checkbox
                color="red"
                onInput={(newVal) => {
                  formik.setFieldValue('acknowledgementWaiver', newVal);
                }}
                label={
                  <TextBody>
                    I confirm that I have completed and signed the{' '}
                    <a
                      href={getEnv().Hibiscus.RSVPForm.WaiverURL}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      HackSC waiver
                    </a>
                    <SpanRed>*</SpanRed>
                  </TextBody>
                }
              />

              {formik.touched.acknowledgementWaiver && (
                <SpanRed>{formik.errors.acknowledgementWaiver}</SpanRed>
              )}
            </QuestionWrap> */}

            <QuestionWrap>
              <Checkbox
                color="red"
                onInput={(newVal) => {
                  formik.setFieldValue('acknowledgementPacket', newVal);
                }}
                label={
                  <TextBody>
                    I confirm that I have read the{' '}
                    <a
                      href={getEnv().Hibiscus.RSVPForm.HackerPacketURL}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      Hacker Welcome Packet
                    </a>
                    <SpanRed>*</SpanRed>
                  </TextBody>
                }
              />

              {formik.touched.acknowledgementPacket && (
                <SpanRed>{formik.errors.acknowledgementPacket}</SpanRed>
              )}
            </QuestionWrap>

            <RedButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              SUBMIT AND CONFIRM YOUR SPOT!
            </RedButton>
          </>
        ) : (
          <Heading3>Loading...</Heading3>
        )}
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
  background: white;
  border-color: #ffb1a3;

  // -ms-overflow-style: none;
  // scrollbar-width: none;
`;

const QuestionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Heading3 = styled(H3)`
  color: #ff6347;
`;

const TextBody = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  color: #ff6347;
  margin: 0;
`;

const RedButton = styled.button`
  padding: 12px 40px 12px 40px;
  border-radius: 8px;
  border: 1px solid black;

  width: fit-content;
  height: 45px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #ffb1a3;
  //fonts
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  color: black;
  :hover {
    background: #ffded9;
    box-shadow: 0px 0px 5px rgba(239, 118, 118, 0.5);
    cursor: pointer;
    transition: 0.1s;
  }
  :active {
    background: #ffb1a3;
  }
`;

const DatePickerOwn = styled(DatePicker)`
  color: #ff6347;
  background: white;
  border-color: #ff6347;
`;
