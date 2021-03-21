import { GlobalState } from './store'
import { ScheduleState, ReminderState } from './slices'

export const selectSchedule = (state: GlobalState): ScheduleState => state.schedule
export const selectReminder = (state: GlobalState): ReminderState => state.reminder
