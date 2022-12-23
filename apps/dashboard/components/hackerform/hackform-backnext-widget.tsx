import { ArrowButton } from '@hacksc-platforms/ui-kit-2023';
import styled from 'styled-components';

interface HackformBackNextWidgetProps {
  goPreviousQuestion: () => void;
  goNextQuestion: () => void;
}

const HackformBackNextWidget = ({
  goNextQuestion,
  goPreviousQuestion,
}: HackformBackNextWidgetProps) => {
  return (
    <BottomWidgetsContainer>
      <BackNextContainer>
        <ArrowButton orientation="left" onClick={goPreviousQuestion} />
        <ArrowButton onClick={goNextQuestion} />
      </BackNextContainer>
    </BottomWidgetsContainer>
  );
};

export default HackformBackNextWidget;

const BottomWidgetsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const BackNextContainer = styled.div`
  display: flex;
  gap: 10px;
`;
