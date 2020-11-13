import styled, { css } from 'styled-components';

export const Answer = styled.button<{
  isSelected?: boolean;
  isCorrect?: boolean;
}>`
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
