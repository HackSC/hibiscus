import { Colors2023 } from '@hibiscus/styles';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';

interface BackButtonProps {
  link: string;
}

export function BackButton({ link: url }: BackButtonProps) {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(url)}>
      <BiArrowBack color={Colors2023.GRAY.SHLIGHT} size={20} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 55px;
  height: 45px;

  background-color: ${Colors2023.GRAY.STANDARD};

  border: 4px solid ${Colors2023.GRAY.MEDIUM};
  border-radius: 10px;

  cursor: pointer;

  &:hover {
    background-color: ${Colors2023.GRAY.MEDIUM};
  }

  &:active {
    background-color: ${Colors2023.GRAY.DARK};
  }
`;
