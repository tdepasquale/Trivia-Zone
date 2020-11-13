import styled, { css } from 'styled-components';

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
