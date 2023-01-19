import { Button } from '@hibiscus/ui-kit-2023';
import HackformQuestionHeader from '../hackform-question-header/hackform-question-header';
import HackformBackNextWidget from '../hackform-backnext-widget/hackform-backnext-widget';
import { HackformQuestion, HackformError } from '@hibiscus/types';
import { IoReturnDownBackOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { GetInputResponseCb } from '../../../common/types';
import { useHackform } from '../../../hooks/use-hackform/use-hackform';
import { Colors2023 } from '@hibiscus/styles';
import { Text } from '@hibiscus/ui';
import Image from 'next/image';

interface QuestionCreatorProps {
  inputComponentChildren: React.ReactNode;
  getInputResponse: GetInputResponseCb;
  question?: HackformQuestion;
  qi?: number;
  handleSubmitWithValidation?: React.MouseEventHandler<HTMLButtonElement>;
  goNextQuestion?: () => void;
  goPreviousQuestion?: () => void;
  error?: HackformError;
  submitButtonUnder?: boolean;
}

export const QuestionCreator = ({
  submitButtonUnder,
  inputComponentChildren,
  question,
  qi,
  handleSubmitWithValidation,
  goNextQuestion,
  goPreviousQuestion,
  error,
  getInputResponse,
}: QuestionCreatorProps) => {
  const { currentQuestionIndex, ...hackformUtils } = useHackform();

  const ErrorChildren = () => {
    const currentError: HackformError =
      error ?? hackformUtils.getCurrentError();
    if (typeof currentError === 'string') {
      return <ErrorText>{currentError}</ErrorText>;
    } else if (Array.isArray(currentError)) {
      return (
        <ul>
          {currentError.map((err, i) => (
            <ErrorText key={i}>
              <li>{err}</li>
            </ErrorText>
          ))}
        </ul>
      );
    } else {
      // don't know what to do here but just renders it
      return <ErrorText>{currentError}</ErrorText>;
    }
  };

  const getRandomIllustration = () => {
    const illustrations = [
      'heart.svg',
      'heart-flying.svg',
      'heart-standing.svg',
      'heart-astronaut.svg',
      'detective.svg',
      'detective-dance.svg',
      'detective-lying.svg',
      'detective-curious.svg',
      'detective-astronaut.svg',
      'purple-planet-jump.svg',
      'purple-planet-stand.svg',
      'purple-planet.svg',
      'puzzle.svg',
      'purple-puzzle.svg',
      'green-puzzle.svg',
      'stacking-puzzle.svg',
      'earth.svg',
      'earth-waving.svg',
      'earth-standing.svg',
      'earth-dancing.svg',
      'postcard.svg',
      'postcard-plane.svg',
      'postcard-traveler.svg',
      'postcard-world.svg',
      'stamp-coin.svg',
      'stamp-puzzle.svg',
      'stamp-heart.svg',
      'stamp-planet.svg',
      'stamp-earth.svg',
      'stamp-hacksc.svg',
    ];

    const pathname =
      '/hackform-illustrations/' +
      illustrations[Math.floor(Math.random() * illustrations.length)];
    return pathname;
  };

  return (
    <PageWrapper>
      <IllustrationAndQuestionWrapper>
        <QuestionWrapper>
          <HackformQuestionHeader
            question={question ?? hackformUtils.getCurrentQuestion()}
            qi={qi ?? currentQuestionIndex}
          />
          <InputAndButtonWrapper submitButtonUnder={submitButtonUnder}>
            {inputComponentChildren}
            <ButtonHintTextContainer>
              <Button
                color="black"
                onClick={
                  handleSubmitWithValidation ??
                  hackformUtils.createCbSubmitValidate(getInputResponse)
                }
              >
                OK
              </Button>
              <SmallText>press Enter</SmallText>
              <StyledEnterIcon>
                <IoReturnDownBackOutline />
              </StyledEnterIcon>
            </ButtonHintTextContainer>
          </InputAndButtonWrapper>
          <ErrorContainer>
            <ErrorChildren />
          </ErrorContainer>
        </QuestionWrapper>
        <IllustrationWrapper>
          <Image
            style={{ margin: '5px 0 0 20px' }}
            width="350"
            height="250"
            src={getRandomIllustration()}
            alt="Illustration"
          />
        </IllustrationWrapper>
      </IllustrationAndQuestionWrapper>
      <HackformBackNextWidget
        goNextQuestion={
          goNextQuestion ??
          hackformUtils.createCbGoNextQuestionValidateSilently(getInputResponse)
        }
        goPreviousQuestion={
          goPreviousQuestion ??
          hackformUtils.createCbGoPrevQuestionValidateSilently(getInputResponse)
        }
      />
    </PageWrapper>
  );
};

export default QuestionCreator;

const IllustrationAndQuestionWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
`;

const IllustrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  height: 100%;
  margin-left: 5rem;

  @media (max-width: 400px) {
    display: none;
  }
`;

const InputAndButtonWrapper = styled.div<{
  submitButtonUnder?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: ${(props) => (props.submitButtonUnder ? 'column' : 'row')};
  align-items: ${(props) =>
    props.submitButtonUnder ? 'flex-start' : 'center'};
`;

const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  height: 100%;
`;

const ErrorText = styled(Text)`
  color: ${Colors2023.RED.STANDARD};
`;

const SmallText = styled(Text)`
  font-size: small;

  @media (max-width: 400px) {
    display: none;
  }
`;

const StyledEnterIcon = styled.div`
  @media (max-width: 400px) {
    display: none;
  }
`;

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonHintTextContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  @media (max-width: 400px) {
    padding-right: 20px;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
