/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { Colors2023 } from '@hibiscus/styles';
import { H1, H5, H6, Text } from '@hibiscus/ui';
import { useState } from 'react';
import { Button } from '@hibiscus/ui-kit-2023';

interface Props {
  closeModal: () => void;
}

export const EditForm = (props: Props) => {
  const {
    MockCompany,
    companyWebsite,
    companyName,
    companyDescription,
    setModal,
    setMockCompany,
  } = props;
  const [tempWebsite, setTempWebsite] = useState(companyWebsite);
  const [tempDesc, setTempDesc] = useState(companyDescription);

  // edit website
  function handleWebsite(e) {
    setTempWebsite(e.target.value);
  }

  // edit description
  function handleDescription(e) {
    setTempDesc(e.target.value);
  }

  return (
    <Box>
      <img
        src={'/x-button.svg'}
        alt={'x button'}
        style={{ cursor: 'pointer' }}
        onClick={() => setModal(false)}
      />
      <H1>{companyName}</H1>
      <H5>Company Description</H5>

      <textarea
        value={tempDesc}
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
        value={tempWebsite}
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
      <Button
        color="blue"
        onClick={() => {
          setModal(false);

          setMockCompany({
            ...MockCompany,
            website: tempWebsite,
            description: tempDesc,
          });
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default EditForm;

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
  position: relative;

  > img {
    top: 0;
    right: 0;
    position: absolute;
    width: 40px;
    margin: 10px;
  }
`;
