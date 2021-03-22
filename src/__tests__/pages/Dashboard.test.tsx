import { screen, waitFor, fireEvent, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

//import { getWeatherInfoByCity } from '../../services/weatherMapAPI'
import { Storage } from '../../utils/storage'
import Dashboard from '../../pages/Dashboard'
import { renderPage } from '../utils'
import { act } from 'react-dom/test-utils'
import { ReminderProps } from '../../store/slices'

/*
const mockedAddToast = jest.fn()
jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  }
})
*/

const API_REQUEST_DELAY = 200 //ms

beforeEach(async () => {
  //getWeatherInfoByCity.mockImplementation({})

  await Storage.set('schedule', '')
  await Storage.set('reminderList', '')
})

afterEach(async () => {
  jest.clearAllMocks()
  await Storage.clear()
})

afterAll(() => {
  jest.restoreAllMocks()
  jest.clearAllTimers()
})

test('should render Dashboard page', async () => {
  renderPage({ routePath: Dashboard })

  await waitFor(() => expect(screen.queryByTestId('dashboard-page-title')).toBeInTheDocument())
})

test('should be able to schedule a new reminder', async () => {
  renderPage({ routePath: Dashboard })

  await waitFor(() => expect(screen.queryByTestId('dashboard-page-title')).toBeInTheDocument())

  const currentDate = new Date()
  const calendarCellId = `calendar-${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`

  const calendarCell = screen.getByTestId(calendarCellId)
  expect(calendarCell).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(calendarCell, leftClick)

  act(() => jest.advanceTimersByTime(API_REQUEST_DELAY))

  //
  const titleInpup = screen.getByPlaceholderText('Title')
  expect(titleInpup).toBeInTheDocument()

  fireEvent.change(titleInpup, {
    target: {
      value: 'Task 1',
    },
  })

  //
  const descriptionInpup = screen.getByPlaceholderText('Description')
  expect(descriptionInpup).toBeInTheDocument()

  fireEvent.change(descriptionInpup, {
    target: {
      value: 'I should do this today',
    },
  })

  //
  const cityInpup = screen.getByPlaceholderText('City')
  expect(cityInpup).toBeInTheDocument()

  fireEvent.change(cityInpup, {
    target: {
      value: 'New York',
    },
  })

  //
  const colorInpup = screen.getByPlaceholderText('Color')
  expect(colorInpup).toBeInTheDocument()

  fireEvent.change(colorInpup, {
    target: {
      value: '#ff9000',
    },
  })

  const confirmButton = screen.getByRole('button', { name: 'Confirm Scheduler' })
  expect(confirmButton).toBeInTheDocument()

  userEvent.click(confirmButton, leftClick)

  /*
  await wait(() => {
    expect(mockedAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
      }),
    )
  })
  */
  await waitFor(() => expect(screen.getByTestId('toast-container')).toBeInTheDocument())

  /**@todo: check if it is the correct toast. */
})
