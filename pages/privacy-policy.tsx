import Head from 'next/head';
import styled from 'styled-components';

export default function PrivacyPolicy() {
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  `;

  return (
    <>
      <Head>
        <title>Privacy Policy | Trivia Zone</title>
        <link
          rel="icon"
          href="https://www.google.com/s2/favicons?domain=depasquale-design.com"
        />
      </Head>

      <main>
        <Container>
          <h1>Privacy Policy Goes Here</h1>
        </Container>
      </main>
    </>
  );
}
