import { Dispatch, SetStateAction, useState } from 'react';
import { Answer, Container, Question, SubmitButton } from '../pages/demo';
import { quizAnswer } from '../types/quizAnswer';

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
