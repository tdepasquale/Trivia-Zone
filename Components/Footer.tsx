import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.footer`
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

export default function Footer() {
  return (
    <Container>
      <Link href="/">
        <FooterLink>Home</FooterLink>
      </Link>
      <Link href="/terms-of-use">
        <FooterLink>Terms of Use</FooterLink>
      </Link>
      <Link href="/privacy-policy">
        <FooterLink>Privacy Policy</FooterLink>
      </Link>
    </Container>
  );
}
