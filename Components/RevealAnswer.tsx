import { Howl } from 'howler';
import React from 'react';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaArrowCircleRight,
} from 'react-icons/fa';
import { quizAnswer } from '../types/quizAnswer';
import { Container } from '../Shared-Styled-Components/Container';
import { Question } from '../Shared-Styled-Components/Question';
import { Answer } from '../Shared-Styled-Components/Answer';
import { SubmitButton } from '../Shared-Styled-Components/SubmitButton';

interface IProps {
  answers: quizAnswer[];
  selectedAnswer: number;
  incrementPoints: () => void;
  question: string;
  nextQuestion: () => void;
}

export const RevealAnswer: React.FC<IProps> = ({
  answers,
  selectedAnswer,
  incrementPoints,
  question,
  nextQuestion,
}: IProps) => {
  if (answers[selectedAnswer].isCorrect) {
    const sound = new Howl({
      src: ['short_success.wav'],
    });
    sound.play();
    incrementPoints();
  }

  return (
    <Container>
      <Question>{question}</Question>
      {answers.map((answer, i) => {
        if (answer.isCorrect) {
          return (
            <Answer key={answer.text} isCorrect>
              <FaCheckCircle className="float-left" />
              {answer.text}
            </Answer>
          );
        } else {
          return (
            <Answer key={answer.text} isSelected={i === selectedAnswer}>
              {i === selectedAnswer && <FaTimesCircle className="float-left" />}
              {answer.text}
            </Answer>
          );
        }
      })}
      <SubmitButton onClick={nextQuestion}>
        Continue
        <FaArrowCircleRight className="float-right" />
      </SubmitButton>
    </Container>
  );
};
