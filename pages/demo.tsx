import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import questions from '../data/Apprentice_TandemFor400_Data.json';
import { Howl } from 'howler';
import {
  FaCheckCircle,
  FaArrowCircleRight,
  FaTimesCircle,
  FaTwitter,
} from 'react-icons/fa';
import {
  startConfetti,
  stopConfetti,
  removeConfetti,
} from '../Utilities/confetti';
import { GameOver } from '../Components/GameOver';

type quizQuestion = {
  correct: string;
  incorrect: string[];
  question: string;
};

type possibleAnswer = {
  text: string;
  isCorrect: boolean;
};

const Background = styled.div`
  background-color: var(--color-blue);
`;

const GameContainer = styled.div<{ isReading: boolean }>`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${(props) =>
    props.isReading &&
    css`
      background: url('./robot.gif');
      background-size: contain;
      background-position: right center;
      background-repeat: no-repeat;
    `}

  @media screen and (max-width: 1000px) {
    background-size: cover;
    background-position: center center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Question = styled.div`
  max-width: 800px;
  width: 90%;
  font-size: 4rem;
  margin: 0 auto 2em;

  @media screen and (max-width: 1000px) {
    margin-top: 2em;
    font-size: 3.5rem;
  }
`;

const Answer = styled.button<{ isSelected?: boolean; isCorrect?: boolean }>`
  max-width: 400px;
  width: 90%;
  margin: 1em;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: #eee;
  border: 2px solid black;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: var(--color-pink);
      color: white;
      border: white 2px solid;
      font-weight: 700;
    `}

  ${(props) =>
    props.isCorrect &&
    css`
      background-color: var(--color-success);
      color: white;
      border: white 2px solid;
      font-weight: 700;
    `}
`;

export const SubmitButton = styled.button<{ isGameOver?: boolean }>`
  max-width: 400px;
  width: 90%;
  margin: 1em;
  padding: 1rem;
  color: white;
  background-color: black;

  &:disabled {
    background-color: #ccc;
  }

  @media screen and (max-width: 1000px) {
    margin-bottom: 8rem;
  }

  ${(props) =>
    props.isGameOver &&
    css`
      @media screen and (max-width: 1000px) {
        margin-bottom: 1rem;
      }
    `}
`;

const PlayButton = styled.button`
  padding: 1em 2em;
  margin: 4rem;
  background-color: var(--color-pink);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 5px;
  transition: color 0.5s ease-out, background-color 0.5s ease-out;

  &:disabled {
    color: black;
    background-color: #ccc;
  }
`;

const SkipButton = styled.button`
  background-color: white;
  color: black;
  padding: 1rem 1.5rem;
  border: 2px solid black;
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.3);
`;

export default function Demo() {
  const quizQuestionsRef = useRef<quizQuestion[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<possibleAnswer[][]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [gameState, setGameState] = useState<
    'menu' | 'playing' | 'checking answer' | 'game over'
  >('menu');
  const pointsRef = useRef(0);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;
  }, []);

  const handleStart = () => {
    pointsRef.current = 0;
    setSelectedAnswer(null);
    setQuestionIndex(0);
    selectQuestions();
    randomizeAnswers();
    setGameState('playing');
    readQuestion(quizQuestionsRef.current[0].question);
  };

  const selectQuestions = () => {
    const questionPool = [...questions];
    const selectedQuestions = [];

    for (let index = 0; index < 10; index++) {
      const randomQuestionNumber = Math.floor(
        Math.random() * questionPool.length
      );
      selectedQuestions.push(questionPool[randomQuestionNumber]);
      questionPool.splice(randomQuestionNumber, 1);
    }

    quizQuestionsRef.current = selectedQuestions;
  };

  const randomizer = (
    answer1: possibleAnswer,
    answer2: possibleAnswer
  ): number => {
    return 0.5 - Math.random();
  };

  const randomizeAnswers = () => {
    const randomizedAnswers: possibleAnswer[][] = [];

    quizQuestionsRef.current.forEach((question) => {
      const answers: possibleAnswer[] = [
        { text: question.correct, isCorrect: true },
      ];
      question.incorrect.forEach((answer) =>
        answers.push({ text: answer, isCorrect: false })
      );

      const shuffledAnswers = answers.sort(randomizer);

      randomizedAnswers.push(shuffledAnswers);
    });

    setQuizAnswers([...randomizedAnswers]);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setGameState('checking answer');
  };

  const nextQuestion = () => {
    if (questionIndex + 1 >= quizQuestionsRef.current.length)
      setGameState('game over');
    else {
      readQuestion(quizQuestionsRef.current[questionIndex + 1].question);
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setGameState('playing');
    }
  };

  const playAgain = () => {
    handleStart();
  };

  const setVoice = (
    preferredVoice = 'Google UK English Male'
  ): SpeechSynthesisVoice => {
    let voice = null;
    voice = synthRef.current
      .getVoices()
      .filter((voice) => voice.name === preferredVoice)[0];
    if (voice === null)
      voice = synthRef.current
        .getVoices()
        .filter((voice) => voice.lang === 'en-US')[0];
    return voice;
  };

  const readQuestion = (question: string) => {
    setIsReading(true);
    let utterance = new SpeechSynthesisUtterance(question);

    utterance.voice = setVoice('Google UK English Male');

    utterance.pitch = 0.5;
    utterance.rate = 0.7;
    utterance.onend = () => setIsReading(false);
    synthRef.current.speak(utterance);
  };

  const skipReading = () => {
    synthRef.current.cancel();
    setIsReading(false);
  };

  const DisplayQuestion = () => {
    if (gameState !== 'playing' || isReading) return null;
    const answers = quizAnswers[questionIndex];

    return (
      <>
        <Question>{quizQuestionsRef.current[questionIndex]?.question}</Question>
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
      </>
    );
  };

  const RevealAnswer = () => {
    if (gameState !== 'checking answer') return null;
    const answers = quizAnswers[questionIndex];
    if (answers[selectedAnswer].isCorrect) {
      const sound = new Howl({
        src: ['short_success.wav'],
      });
      sound.play();
      pointsRef.current += 1;
    }

    return (
      <>
        <Question>{quizQuestionsRef.current[questionIndex]?.question}</Question>
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
                {i === selectedAnswer && (
                  <FaTimesCircle className="float-left" />
                )}
                {answer.text}
              </Answer>
            );
          }
        })}
        <SubmitButton onClick={nextQuestion}>
          Continue
          <FaArrowCircleRight className="float-right" />
        </SubmitButton>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Demo | Trivia Zone</title>
        <link
          rel="icon"
          href="https://www.google.com/s2/favicons?domain=depasquale-design.com"
        />
      </Head>

      <main>
        <Background>
          <GameContainer isReading={isReading}>
            <PlayButton onClick={handleStart} hidden={gameState !== 'menu'}>
              Play
            </PlayButton>
            <Container hidden={gameState !== 'playing'}>
              <DisplayQuestion />
            </Container>
            <div hidden={isReading === false}>
              <SkipButton onClick={skipReading}>Skip</SkipButton>
            </div>
            <Container hidden={gameState !== 'checking answer'}>
              <RevealAnswer />
            </Container>
            {gameState === 'game over' && (
              <GameOver points={pointsRef.current} playAgain={playAgain} />
            )}
          </GameContainer>
        </Background>
      </main>
    </>
  );
}
