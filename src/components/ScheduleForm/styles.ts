import styled from 'styled-components'
import { shade } from 'polished'

import Input from '../../components/Input'

export const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: var(--neutral-color);
  border: 1px solid var(--border-color);

  margin-top: 1.5em;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  place-content: center;

  form {
    text-align: center;
    display: flex;
    flex-direction: column;

    width: 100%;

    div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      margin-top: 5px;
    }

    & + div {
      margin-top: 20px;
    }
  }
`

interface InputProps {
  size: number
}

export const InputComponent = styled(Input)<InputProps>`
  width: ${props => props.size}em;
`
