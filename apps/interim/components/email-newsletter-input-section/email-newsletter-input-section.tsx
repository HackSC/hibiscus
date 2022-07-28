import { TrademarkColors } from '@hacksc-platforms/styles';
import { Text } from '@hacksc-platforms/ui';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import * as Yup from 'yup';
import useSendgridClient from '../../hooks/use-sendgrid-client/use-sendgrid-client';

/* eslint-disable-next-line */
export interface EmailNewsletterInputSectionProps {}

export function EmailNewsletterInputSection(
  props: EmailNewsletterInputSectionProps
) {
  const { sendgridClient } = useSendgridClient();
  const saveContactToSendgridMutation = useMutation(async (email: string) => {
    if (process.env.NODE_ENV === 'production') {
      await sendgridClient.saveContactsToLists([], [email]);
    } else {
      console.log('-> [non-production log] sent to Sendgrid');
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
        error: 'Oops, something went wrong on our end. Please try again.',
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <EmailInput
          placeholder={'Subscribe to our email newsletter!'}
          onChange={formik.handleChange}
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <Text style={{ color: 'red' }}>{formik.errors.email}</Text>
        ) : null}
        <GradientButton type="submit">
          {saveContactToSendgridMutation.isLoading ? '...' : 'STAY UP TO DATE'}
        </GradientButton>
      </Container>
    </form>
  );
}

export default EmailNewsletterInputSection;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding-left: -1rem;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
  padding-top: 2rem;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const GradientButton = styled.button`
  background: linear-gradient(
    90deg,
    ${TrademarkColors.LIGHT_BLUE} 0%,
    ${TrademarkColors.LIGHT_PURPLE} 100%
  );
  border: none;
  padding: 12px 2px;
  color: white;
  font-weight: 900;
  border-radius: 0.3rem;
  box-shadow: 0px 2px 10px -1px #a0a0a0;
  font-size: 1.1rem;
  font-family: Inter, sans-serif;
  cursor: pointer;
  min-width: 30%;

  @media (max-width: 1080px) {
    width: 100%;
    margin-top: 20px;
  }
`;

const EmailInput = styled.input`
  border: solid 0.1rem #bcbcbc;
  background-color: #f8f8f8;
  border-radius: 0.3rem;
  padding: 10px;
  padding-left: 25px;
  font-family: Inter, sans-serif;
  font-size: 1.1rem;
  color: #676767;
  margin-left: 5;
  max-width: 100%;
  width: 100%;
`;
