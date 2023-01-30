import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { H1, H5, H6, Text } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';

interface Props {
  closeModal: () => void;
}

export const UploadImage = (props: Props) => {
  return (
    <Box>
      <input type="file" id="file" />
      <Button color="blue" onClick={() => props.setUploadImage(false)}>
        Finished
      </Button>
    </Box>
  );
};

export default UploadImage;

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
