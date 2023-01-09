import { H2 } from '@hibiscus/ui';
import { Button, OneLineText, ParagraphText } from '@hibiscus/ui-kit-2023';
import { useState } from 'react';
import styled from 'styled-components';
import { GrayBox } from '../gray-box/gray-box';
import { toast } from 'react-hot-toast';

interface Props {
  closeModal: () => void;
}

export const TeamCreateForm = (props: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    props.closeModal();
    const createTeamSuccess = true;
    if (createTeamSuccess) {
      toast.success('Successfully created team');
    }
  };

  return (
    <Box>
      <H2>Create your team</H2>
      <FormDiv>
        <label>Name:</label>
        <OneLineText
          value={name}
          placeholder="e.g Trojan Hackers"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Description:</label>
        <ParagraphText
          style={{ width: '92%' }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="e.g Team full of hackers :0 your local hackathon destroyer :)"
        />
      </FormDiv>
      <Button color="blue" onClick={handleSubmit}>
        SUBMIT
      </Button>
    </Box>
  );
};

export default TeamCreateForm;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Box = styled(GrayBox)`
  gap: 20px;
`;
