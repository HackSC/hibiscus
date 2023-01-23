import { Text } from '@hibiscus/ui';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import * as Yup from 'yup';
import useSendgridClient from '../../hooks/use-sendgrid-client/use-sendgrid-client';
import { OneLineText, Button } from '@hibiscus/ui-kit-2023';
/* eslint-disable-next-line */
export interface EmailNewsletterInputSectionProps {}

export function EmailNewsletterInputSection(
  props: EmailNewsletterInputSectionProps
) {
  const { sendgridClient } = useSendgridClient();
  const INTERIM_UPDATES_SENDGRID_LIST_ID =
    '04bc362d-512d-4f15-9dc4-10ff5e82bd28';
  const saveContactToSendgridMutation = useMutation(async (email: string) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[non-production mode] made an "API call" to Sendgrid`);
      return;
    }
    try {
      await sendgridClient.saveContactsToLists(
        [INTERIM_UPDATES_SENDGRID_LIST_ID],
        [email]
      );
    } catch (e) {
      throw new Error(
        'Oops, something went wrong on our end. Please try again.'
      );
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email(
          'Oops, this seems like an invalid email. Make sure you typed a valid email'
        )
        .required('Please enter your email'),
    }),
    onSubmit: (values) => {
      toast.promise(saveContactToSendgridMutation.mutateAsync(values.email), {
        loading: 'Subscribing you to our newsletter...',
        success: "You have subscribed to HackSC's newsletter. Stay tuned!",
        error: (e) => e.toString(),
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <TextInput>
          <OneLineText
            placeholder={'Subscribe to email updates!'}
            onChange={formik.handleChange}
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            style={{ minWidth: '24vw' }}
          />
          {formik.errors.email && formik.touched.email ? (
            <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
          ) : null}
        </TextInput>
        <Button color="black">
          {saveContactToSendgridMutation.isLoading ? '...' : 'STAY UP TO DATE'}
        </Button>
      </Container>
    </form>
  );
}

export default EmailNewsletterInputSection;

const Container = styled.div`
  height: 15vh;
  display: flex;
  padding: 2rem 0 1rem;
  align-items: flex-start;
  justify-content: space-between;
  @media (max-width: 1080px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  @media (max-width: 800px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const TextInput = styled.div`
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min-content;
`;
