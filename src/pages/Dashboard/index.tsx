import React from 'react'

import { Calendar, ScheduleForm } from '../../components'

import { Container, HeaderContent, Logo, IconCalendar, Title, MainContent } from './styles'

export const Dashboard: React.FC = () => (
  <Container>
    <HeaderContent>
      <Logo>
        <IconCalendar>date_range</IconCalendar>
        <Title>Scheduler</Title>
      </Logo>
    </HeaderContent>
    <MainContent>
      <Calendar />
      <ScheduleForm />
    </MainContent>
  </Container>
)
