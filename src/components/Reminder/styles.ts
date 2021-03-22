import styled from 'styled-components'

import CustomAccordion from '../CustomAccordion'

export const Header = styled.header`
  display: block;
  position: relative;
  width: 100%;

  margin-bottom: -20px;

  div {
    display: flex;
    justify-content: center;

    padding-top: 0.2em;
    padding-bottom: 0.2em;
    background-color: var(--main-color);

    > span {
      color: var(--neutral-color);
    }
  }
`

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
  flex-direction: column;
  place-content: center;
`

export const AccordionContent = styled(Container)`
  margin-bottom: -1.1em;
`

export const Accordion = styled(CustomAccordion)``

export const Footer = styled.footer`
  display: block;
  position: relative;
  width: 100%;

  margin-top: 21px;

  div {
    display: flex;
    justify-content: center;

    padding-top: 0.2em;
    padding-bottom: 0.2em;
    background-color: var(--main-color);

    > svg {
      color: var(--neutral-color);
      margin-top: 0.1em;
      margin-bottom: 0.1em;

      cursor: pointer;
    }
  }
`
