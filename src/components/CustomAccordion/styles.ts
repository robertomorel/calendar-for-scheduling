import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
`

interface SignalProps {
  color: string
}

export const Signal = styled.div<SignalProps>`
  width: 0.3em;
  background-color: ${props => props.color};
  margin-right: 0.5em;
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 750px;
`

export const ContentLeft = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`

export const ContentRight = styled.div`
  div {
    & + div {
      margin-top: 1.2em;
    }

    svg {
      margin-left: auto; /* Pega todo o espaço disponível na esquerda, e joga pra lá */
      color: #cbcbd6;
      cursor: pointer;

      &:hover {
        background: ${shade(0.1, '#1a8fff')};
      }
    }
  }
`
