import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import questions from '../data/Apprentice_TandemFor400_Data.json';
import { GameOver } from '../Components/GameOver';
import { DisplayQuestion } from '../Components/DisplayQuestion';
import { RevealAnswer } from '../Components/RevealAnswer';
import { quizQuestion } from '../types/quizQuestion';
import { quizAnswer } from '../types/quizAnswer';

const Background = styled.div`
  background-color: var(--color-blue);
`;

const GameContainer = styled.div<{ isReading: boolean }>`
  min-height: 100vh;
  width: 100%;
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
  const [quizAnswers, setQuizAnswers] = useState<quizAnswer[][]>([]);
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

  const randomizer = (answer1: quizAnswer, answer2: quizAnswer): number => {
    return 0.5 - Math.random();
  };

  const randomizeAnswers = () => {
    const randomizedAnswers: quizAnswer[][] = [];

    quizQuestionsRef.current.forEach((question) => {
      const answers: quizAnswer[] = [
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

  const handleIncrementPoints = () => {
    pointsRef.current += 1;
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
            {gameState === 'menu' && (
              <PlayButton onClick={handleStart}>Play</PlayButton>
            )}
            {gameState === 'playing' && !isReading && (
              <DisplayQuestion
                question={quizQuestionsRef.current[questionIndex]?.question}
                answers={quizAnswers[questionIndex]}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                checkAnswer={checkAnswer}
              />
            )}
            {isReading === true && (
              <SkipButton onClick={skipReading}>Skip</SkipButton>
            )}
            {gameState === 'checking answer' && (
              <RevealAnswer
                answers={quizAnswers[questionIndex]}
                question={quizQuestionsRef.current[questionIndex]?.question}
                incrementPoints={handleIncrementPoints}
                selectedAnswer={selectedAnswer}
                nextQuestion={nextQuestion}
              />
            )}
            {gameState === 'game over' && (
              <GameOver points={pointsRef.current} playAgain={playAgain} />
            )}
          </GameContainer>
        </Background>
      </main>
    </>
  );
}
