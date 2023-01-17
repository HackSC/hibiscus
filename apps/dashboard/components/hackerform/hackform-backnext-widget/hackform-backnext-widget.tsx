import { ArrowButton } from '@hibiscus/ui-kit-2023';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import styled from 'styled-components';

interface HackformBackNextWidgetProps {
  goPreviousQuestion: () => void;
  goNextQuestion: () => void;
}

export const HackformBackNextWidget = ({
  goNextQuestion,
  goPreviousQuestion,
}: HackformBackNextWidgetProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();
  const isLastQuestion =
    currentQuestionIndex ===
    hackformUtils.getHackformMetadata().questions.length - 1;
  return (
    <BottomWidgetsContainer>
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
