import React from 'react'

import { Calendar, ScheduleForm, Reminder } from '../../components'

import { Container, HeaderContent, Logo, IconCalendar, Title, MainContent } from './styles'

export const Dashboard: React.FC = () => (
  <Container>
    <HeaderContent>
      <Logo>
        <IconCalendar>date_range</IconCalendar>
        <Title data-testid="dashboard-page-title">Scheduler</Title>
      </Logo>
    </HeaderContent>
    <MainContent>
      <Calendar />
      <Reminder />
      <ScheduleForm />
    </MainContent>
  </Container>
)
