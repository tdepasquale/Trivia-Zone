import { Dispatch, SetStateAction, useState } from 'react';
import { quizAnswer } from '../types/quizAnswer';
import { Container } from '../Shared-Styled-Components/Container';
import { Question } from '../Shared-Styled-Components/Question';
import { Answer } from '../Shared-Styled-Components/Answer';
import { SubmitButton } from '../Shared-Styled-Components/SubmitButton';

interface IProps {
  question: string;
  answers: quizAnswer[];
  selectedAnswer: null | number;
  setSelectedAnswer: Dispatch<SetStateAction<number>>;
  checkAnswer: () => void;
}

export const DisplayQuestion: React.FC<IProps> = ({
  question,
  answers,
  selectedAnswer,
  setSelectedAnswer,
  checkAnswer,
}: IProps) => {
  return (
    <Container>
      <Question>{question}</Question>
      {answers.map((answer, i) => {
        return (
          <Answer
            key={answer.text}
            onClick={() => setSelectedAnswer(i)}
            isSelected={i === selectedAnswer}
          >
            {answer.text}
          </Answer>
        );
      })}
      <SubmitButton onClick={checkAnswer} disabled={selectedAnswer === null}>
        Submit
      </SubmitButton>
    </Container>
  );
};
