import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.button`
  background: var(--main-color);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: var(--neutral-color);
  width: 30%;
  font-weight: 500;
  margin-top: 21px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#1a8fff')};
  }
`
