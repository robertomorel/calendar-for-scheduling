import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 12px;

  display: flex;
  align-items: center;

  border: 2px solid #232129;
  color: #666360;

  /* Regra para a borda ficar vermelha caso exista erro no campo */
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  /* Regra para o container ficar laranja caso o input esteja em foco. */
  ${props =>
    props.isFocused &&
    css`
      border-color: var(--main-color);
      color: var(--main-color);
    `}

  /* Regra para o ícone também ficar laranja caso o campo esteja preenchido. */
  ${props =>
    props.isFilled &&
    css`
      color: var(--main-color);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030;
    }
  }
`
