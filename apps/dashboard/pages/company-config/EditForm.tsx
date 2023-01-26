import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { H1, H5, H6, Text } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';

interface Props {
  closeModal: () => void;
}

export const EditForm = (props: Props) => {
  const {
    handleWebsite,
    handleDescription,
    companyWebsite,
    companyName,
    companyDescription,
    setModal,
  } = props;
  return (
    <Box>
      <H1>{companyName}</H1>
      <H5>Company Description</H5>

      <textarea
        value={companyDescription}
        onChange={handleDescription}
        style={{
          resize: 'none',
          backgroundColor: 'gray',
          borderColor: 'rgba(0, 0, 0, 0)',
          outline: 'none',
          color: 'white',
          borderRadius: 20,
          padding: 15,
        }}
      />
      <H5>Company Website</H5>
      <input
        value={companyWebsite}
        onChange={handleWebsite}
        style={{
          resize: 'none',
          backgroundColor: 'gray',
          borderColor: 'rgba(0, 0, 0, 0)',
          outline: 'none',
          color: 'white',
          borderRadius: 20,
          padding: 15,
        }}
      />
      <H6>* Changes will automatically save</H6>
      <Button color="blue" onClick={() => setModal(false)}>
        Finished
      </Button>
    </Box>
  );
};

export default EditForm;

const FormDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Box = styled.div`
  gap: 20px;
  min-width: 40rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem;
  color: white;
  border: 1px solid ${Colors2023.BLUE.STANDARD};
  border-radius: 1rem;
  box-sizing: border-box;
  background: #363636;
  border: 2px solid #5a5a5a;
  border-radius: 10px;
`;
