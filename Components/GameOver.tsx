import { Howl } from 'howler';
import React, { useEffect } from 'react';
import { FaArrowCircleRight, FaTwitter } from 'react-icons/fa';
import {
  startConfetti,
  stopConfetti,
  removeConfetti,
} from '../Utilities/confetti';
import { Container } from '../Shared-Styled-Components/Container';
import { Question } from '../Shared-Styled-Components/Question';
import { SubmitButton } from '../Shared-Styled-Components/SubmitButton';

interface IProps {
  points: number;
  playAgain: () => void;
}

export const GameOver: React.FC<IProps> = ({ points, playAgain }: IProps) => {
  const sound = new Howl({
    src: ['success.wav'],
  });
  sound.play();

  useEffect(() => {
    startConfetti();
    return () => {
      stopConfetti();
      removeConfetti();
    };
  }, []);

  const handleTweet = () => {
    const tweet = `I just scored ${points} points on Trivia Zone!  Try it yourself at trivia-zone.vercel.com @madeintandem`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweet}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Container>
      <Question>You scored {points} points!</Question>

      <SubmitButton onClick={playAgain} isGameOver>
        Play Again
        <FaArrowCircleRight className="float-right" />
      </SubmitButton>

      <SubmitButton onClick={handleTweet} isGameOver>
        Tweet Score
        <FaTwitter className="float-right twitter-btn" />
      </SubmitButton>
    </Container>
  );
};
