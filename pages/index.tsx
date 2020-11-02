import Head from 'next/head';
import styled, { css } from 'styled-components';
import Link from 'next/link';

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-blue);
  overflow-x: hidden;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  height: 100%;
  width: 45vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--color-blue);

  @media screen and (max-width: 1000px) {
    width: 95vw;
  }
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media screen and (max-width: 1000px) {
    justify-content: center;
  }
`;

const RightContainer = styled.div`
  min-height: 100vh;
  width: 45vw;
  background-color: var(--color-blue);
  background: url('./robot.gif');
  background-size: contain;
  background-position: right center;
  background-repeat: no-repeat;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;

  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

const Heading = styled.h1<{ underline?: boolean }>`
  position: relative;
  font-size: 10rem;
  font-weight: 900;
  line-height: 1.2;

  @media screen and (max-width: 1400px) {
    font-size: 7rem;
  }
  @media screen and (max-width: 1000px) {
    font-size: 5rem;
  }
`;

const SlideAnim = styled.span<{ delay?: number }>`
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -5px;
    width: 105%;
    height: 10rem;
    background-color: var(--color-blue);
    animation: slide 0.5s ease-out forwards;

    ${(props) =>
      props.delay &&
      css`
        animation-delay: ${props.delay}s;
      `}
  }

  @keyframes slide {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(150%);
    }
  }
`;

const FadeInAnim = styled.span<{ delay?: number }>`
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  margin: 2rem 0 4rem 0;
  display: block;

  ${(props) =>
    props.delay &&
    css`
      animation-delay: ${props.delay}s;
    `}

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Subheading = styled.p`
  font-size: 2rem;
  margin: 2rem 0;
  text-align: left;

  @media screen and (max-width: 1000px) {
    max-width: 30rem;
    text-align: center;
  }
`;

const DemoButton = styled.a`
  padding: 1em 2em;
  margin: 2rem 0 4rem 0;
  background-color: var(--color-pink);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 5px;
  transition: filter 0.2s ease-out;

  &:hover {
    filter: brightness(1.2);
  }
`;

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Trivia Zone</title>
        <link
          rel="icon"
          href="https://www.google.com/s2/favicons?domain=depasquale-design.com"
        />
      </Head>

      <main>
        <HeroContainer>
          <LeftContainer>
            <CenterContainer>
              <Container>
                <Heading className="z-5">
                  <SlideAnim delay={0}>Welcome</SlideAnim>
                </Heading>
                <Heading className="z-4">
                  <SlideAnim delay={0.2}>to the</SlideAnim>
                </Heading>
                <Heading>
                  <SlideAnim delay={0.4}>Trivia Zone!</SlideAnim>
                </Heading>
                <Subheading>
                  <FadeInAnim delay={0.6}>
                    An alternate reality in which the only thing that matters is
                    trivia.
                  </FadeInAnim>
                </Subheading>
                <FadeInAnim delay={0.8}>
                  <Link href="/demo">
                    <DemoButton>Try Demo</DemoButton>
                  </Link>
                </FadeInAnim>
              </Container>
            </CenterContainer>
          </LeftContainer>
          <RightContainer className="z-6" />
        </HeroContainer>
      </main>
    </>
  );
}
