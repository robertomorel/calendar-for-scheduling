import styled, { css } from 'styled-components'

import { Icon } from '../../styles/sharedStyles'

export const Container = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: var(--neutral-color);
  border: 1px solid var(--border-color);
`

//-------------------------------------------------------
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  text-transform: uppercase;
  font-weight: 700;
  font-size: 115%;
  padding: 1.5em 0;
  border-bottom: 1px solid var(--border-color);
`

export const ArrowIcon = styled(Icon)`
  cursor: pointer;
  transition: 0.15s ease-out;

  &:hover {
    transform: scale(1.75);
    transition: 0.25s ease-out;
    color: var(--main-color);
  }

  &:first-of-type {
    margin-left: 1em;
  }

  &:last-of-type {
    margin-right: 1em;
  }
`

export const MonthYearContent = styled.span``
//-------------------------------------------------------
export const Column = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
`

export const ColCenter = styled(Column)`
  justify-content: center;
  text-align: center;

  color: var(--bg-color);
  font-weight: 500;
`

export const DaysRow = styled.div`
  display: flex;
  align-items: center;

  text-transform: uppercase;
  font-weight: 400;
  color: var(--text-color-light);
  font-size: 70%;
  padding: 0.75em 0;
  border-bottom: 1px solid var(--border-color);

  background-color: var(--main-color);
`
//-------------------------------------------------------
interface CalendarBodyProps {
  isDisabled?: boolean
  isSelected?: boolean
}

export const CalendarBody = styled.div<CalendarBodyProps>`
  flex-grow: 0;
  flex-basis: calc(100% / 7);
  width: calc(100% / 7);

  ${props =>
    props.isDisabled &&
    css`
      color: var(--text-color-light);
      pointer-events: none;
    `}

  ${props =>
    props.isSelected &&
    css`
      border-left: 10px solid transparent;
      border-image: linear-gradient(45deg, #1a8fff 0%, #53cbf1 40%);
      border-image-slice: 1;
    `}
`

export const CalendarCel = styled(CalendarBody)`
  position: relative;
  height: 5em;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
  cursor: pointer;
  background: var(--neutral-color);
  transition: 0.25s ease-out;

  &:hover {
    background: var(--bg-color);
    transition: 0.5s ease-out;
  }

  &:last-child {
    border-right: none;
  }
`

export const CelNumber = styled.span`
  position: absolute;
  font-size: 82.5%;
  line-height: 1;
  top: 0.75em;
  right: 0.75em;
  font-weight: 700;

  &:hover {
    opacity: 0.05;
    transition: 0.5s ease-in;
  }
`

export const CelBg = styled.span<CalendarBodyProps>`
  font-weight: 700;
  line-height: 1;
  color: var(--main-color);
  opacity: 0;
  font-size: 8em;
  position: absolute;
  top: -0.2em;
  right: -0.05em;
  transition: 0.25s ease-out;
  letter-spacing: -0.07em;

  &:hover {
    opacity: 0.05;
    transition: 0.5s ease-in;
  }

  ${props =>
    props.isSelected &&
    css`
      opacity: 0.05;
      transition: 0.5s ease-in;
    `}
`

export const CalendarRow = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`

export const BodyRow = styled.div`
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`

export const Row = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  align-items: center;
`
