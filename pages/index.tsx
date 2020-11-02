import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: var(--color-blue);
`;

const Heading = styled.h1`
  font-size: 6rem;
`;

const DemoButton = styled.a`
  padding: 1em 2em;
  margin: 4rem;
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
          <Heading>Welcome to the Trivia Zone!</Heading>
          <Link href="/demo">
            <DemoButton>Try Demo</DemoButton>
          </Link>
        </HeroContainer>
      </main>
    </>
  );
}
