import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ScheduleState {
  scheduleDate: Date | undefined
  loading: boolean
  error: string | null
}

export const scheduleInitialState: ScheduleState = {
  scheduleDate: undefined,
  loading: false,
  error: null,
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: scheduleInitialState,
  reducers: {
    actionRequestScheduleStart: (state: ScheduleState) => {
      state.loading = true
    },

    actionRequestScheduleSuccess: (state: ScheduleState, action: PayloadAction<Date | undefined>) => {
      state.scheduleDate = action.payload || undefined
      state.loading = false
      state.error = null
    },

    actionRequestScheduleFailure: (state: ScheduleState, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  actionRequestScheduleStart,
  actionRequestScheduleSuccess,
  actionRequestScheduleFailure,
} = scheduleSlice.actions
