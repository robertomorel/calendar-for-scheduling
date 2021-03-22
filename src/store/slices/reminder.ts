import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ReminderProps {
  id: string
  schedule: Date
  title: string
  description: string
  city: string
  color: string
  weather?: string
}

export interface ReminderState {
  reminder: ReminderProps[] | undefined
  loading: boolean
  error: string | null
  isUpdateWithId: string | null
}

export const reminderInitialState: ReminderState = {
  reminder: undefined,
  loading: false,
  error: null,
  isUpdateWithId: null,
}

export const reminderSlice = createSlice({
  name: 'schedule',
  initialState: reminderInitialState,
  reducers: {
    actionRequestReminderStart: (state: ReminderState) => {
      state.loading = true
    },
    actionCreateNewReminderSuccess: (state, action: PayloadAction<ReminderProps[] | undefined>) => {
      state.reminder = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionCreateNewReminderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionUpdateAReminderSuccess: (state, action: PayloadAction<ReminderProps[] | undefined>) => {
      state.reminder = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionUpdateAReminderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionDeleteAReminderSuccess: (state, action: PayloadAction<ReminderProps[] | undefined>) => {
      state.reminder = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionDeleteAReminderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionDeleteAllReminderSuccess: (state, action: PayloadAction<ReminderProps[] | undefined>) => {
      state.reminder = action.payload || undefined
      state.loading = false
      state.error = null
    },
    actionDeleteAllReminderFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    actionActivateReminderUpdate: (state, action: PayloadAction<string>) => {
      state.isUpdateWithId = action.payload
    },
    actionDesactivateReminderUpdate: state => {
      state.isUpdateWithId = null
    },
  },
})

export const {
  actionRequestReminderStart,
  actionCreateNewReminderSuccess,
  actionCreateNewReminderFailure,
  actionUpdateAReminderSuccess,
  actionUpdateAReminderFailure,
  actionDeleteAReminderSuccess,
  actionDeleteAReminderFailure,
  actionDeleteAllReminderSuccess,
  actionDeleteAllReminderFailure,
  actionActivateReminderUpdate,
  actionDesactivateReminderUpdate,
} = reminderSlice.actions
