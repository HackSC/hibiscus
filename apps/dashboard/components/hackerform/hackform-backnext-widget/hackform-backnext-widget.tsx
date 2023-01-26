import { ArrowButton } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import styled from 'styled-components';
import { Text } from '@hibiscus/ui';

interface HackformBackNextWidgetProps {
  goPreviousQuestion: () => void;
  goNextQuestion: () => void;
}

export const HackformBackNextWidget = ({
  goNextQuestion,
  goPreviousQuestion,
}: HackformBackNextWidgetProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const numQuestions = hackformUtils.getHackformMetadata().questions.length;
  const isLastQuestion = currentQuestionIndex === numQuestions - 1;
  return (
    <BottomWidgetsContainer>
      <Text>
        {currentQuestionIndex + 1} / {numQuestions}
      </Text>
      <BackNextContainer>
        <ArrowButton orientation="left" onClick={goPreviousQuestion} />
        <ArrowButton onClick={goNextQuestion} disabled={isLastQuestion} />
      </BackNextContainer>
    </BottomWidgetsContainer>
  );
};

export default HackformBackNextWidget;

const BottomWidgetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin: 1rem;
  padding-bottom: 1rem;

  @media (max-width: 400px) {
    justify-content: center;
  }
`;

const BackNextContainer = styled.div`
  display: flex;
  gap: 10px;
`;
