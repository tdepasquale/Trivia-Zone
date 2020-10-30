import Head from 'next/head';
import styled from 'styled-components';

const HeroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 4rem;
`;

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterLink = styled.a`
  padding: 1em 2em;
  &:hover {
    text-decoration: underline;
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
        </HeroContainer>
      </main>

      <Footer>
        <FooterLink href="#">Terms of Use</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
      </Footer>
    </>
  );
}
