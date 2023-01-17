import { H2, Text } from '@hibiscus/ui';
import { Button, OneLineText, ParagraphText } from '@hibiscus/ui-kit-2023';
import styled from 'styled-components';
import { GrayBox } from '../gray-box/gray-box';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SpanRed } from '../red-span';
import { useTeam } from '../../hooks/use-team/use-team';
import { TeamServiceAPI } from '../../common/api';
import useHibiscusUser from '../../hooks/use-hibiscus-user/use-hibiscus-user';

interface Props {
  closeModal: () => void;
}

export const TeamCreateForm = (props: Props) => {
  const { setTeam } = useTeam();
  const { user } = useHibiscusUser();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Please enter your team name!'),
      description: Yup.string().notRequired(),
    }),
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      props.closeModal();
      const { data, error } = await TeamServiceAPI.createTeam(
        values.name,
        values.description,
        user.id
      );
      let createTeamSuccess = true;
      if (error) {
        createTeamSuccess = false;
      }
      if (createTeamSuccess) {
        toast.success('Successfully created team');
        setTeam({
          name: values.name,
          description: values.description,
          id: data.id,
        });
      } else {
        toast.error("Oops, couldn't create your team; " + error.message);
      }
      formikHelpers.setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <H2>Create your team</H2>
        <FormDiv>
          <label htmlFor="name">
            Name:<SpanRed>*</SpanRed>
          </label>
          <OneLineText
            id="name"
            name="name"
            value={formik.values.name}
            placeholder="e.g Trojan Hackers"
            onChange={formik.handleChange}
          />
          <Text>
            <SpanRed>{formik.errors.name}</SpanRed>
          </Text>
          <label htmlFor="description">Description:</label>
          <ParagraphText
            id="description"
            name="description"
            style={{ width: '92%' }}
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="e.g Team full of hackers :0 your local hackathon destroyer :)"
          />
          <Text>{formik.errors.description}</Text>
        </FormDiv>
        <Button color="blue" type="submit">
          SUBMIT
        </Button>
      </Box>
    </form>
  );
};

export default TeamCreateForm;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box = styled(GrayBox)`
  gap: 20px;
`;
