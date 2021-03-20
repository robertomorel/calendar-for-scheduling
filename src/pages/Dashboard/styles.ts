import styled from 'styled-components'

import { Icon } from '../../styles/sharedStyles'

export const Container = styled.div``

export const HeaderContent = styled.header`
  display: block;
  width: 100%;
  padding: 1.75em 0;
  border-bottom: 1px solid var(--border-color);
  background: var(--neutral-color);
`

export const Logo = styled.div`
  font-size: 175%;
  text-align: center;
  color: var(--main-color);
  line-height: 1;
`

export const IconCalendar = styled(Icon)`
  padding-right: 0.25em;
`

export const Title = styled.span`
  font-weight: bold;
`

export const MainContent = styled.main`
  display: block;
  margin: 0 auto;
  margin-top: 2em;
  max-width: 50em;
`
