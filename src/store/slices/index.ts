import { combineReducers } from '@reduxjs/toolkit'

import { scheduleSlice } from './schedule'
import { reminderSlice } from './reminder'

export * from './schedule'
export * from './reminder'

export const rootReducer = combineReducers({
  schedule: scheduleSlice.reducer,
  reminder: reminderSlice.reducer,
})
