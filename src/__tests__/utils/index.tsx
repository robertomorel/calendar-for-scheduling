import React from 'react'
import { Provider } from 'react-redux'
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import GlobalStyle from '../../styles/global'
import { applyMiddleware, createStore, Store } from '@reduxjs/toolkit'
import { scheduleInitialState, reminderInitialState, rootReducer } from '../../store/slices'
import { GlobalState } from '../../store'
import App from '../../App'
import { ToastProvider } from '../../hooks/toast'

const configureMockedStore = (initialState: Partial<GlobalState>): Store =>
  createStore(
    rootReducer,
    {
      schedule: scheduleInitialState,
      reminder: reminderInitialState,
      ...initialState,
    },
    applyMiddleware(thunk),
  )

export const createHistoryForRoute = (routePath?: string): MemoryHistory => {
  const history = createMemoryHistory()

  if (routePath) {
    history.push(routePath)
  }

  return history
}

export interface RenderWithAllProvidersParams {
  ui: React.ReactElement
  initialState?: Partial<GlobalState>
  renderOptions?: Omit<RenderOptions, 'queries'>
}

function renderWithAllProviders({ ui, initialState, renderOptions }: RenderWithAllProvidersParams): RenderResult {
  const withAllProviders: React.FC = ({ children }) => (
    <>
      <GlobalStyle />
      <Provider store={configureMockedStore(initialState)}>
        <ToastProvider>{children}</ToastProvider>
      </Provider>
    </>
  )

  return rtlRender(ui, { wrapper: withAllProviders, ...renderOptions })
}

export type RenderWithAllProvidersReturn = ReturnType<typeof renderWithAllProviders>

export interface RenderPageParams {
  routePath: string
  initialState?: Partial<GlobalState>
  history?: MemoryHistory
  renderOptions?: Omit<RenderOptions, 'queries'>
}

export const renderPage = ({
  routePath,
  initialState,
  history,
  renderOptions = {},
}: RenderPageParams): RenderWithAllProvidersReturn =>
  renderWithAllProviders({
    ui: (
      <Router history={history || createHistoryForRoute(routePath)}>
        <App />
      </Router>
    ),
    initialState,
    renderOptions,
  })
