import { AppThunk } from './store'
import {
  actionRequestScheduleStart,
  actionRequestScheduleSuccess,
  actionRequestScheduleFailure,
  actionRequestReminderStart,
  actionCreateNewReminderSuccess,
  actionCreateNewReminderFailure,
  actionUpdateAReminderSuccess,
  actionUpdateAReminderFailure,
  actionDeleteAReminderSuccess,
  actionDeleteAReminderFailure,
  actionDeleteAllReminderSuccess,
  actionDeleteAllReminderFailure,
  ReminderProps,
} from './slices'
import { Storage } from '../utils/storage'
import { selectSchedule, selectReminder } from './selectors'

export const actionRequestSchedule = (schedule?: Date): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestScheduleStart())
    if (schedule) {
      const currentDate = new Date()
      const dateTime = schedule.setHours(currentDate.getHours(), currentDate.getMinutes())
      await Storage.set('schedule', dateTime.toString())
      dispatch(actionRequestScheduleSuccess(new Date(dateTime)))
    } else {
      dispatch(actionRequestScheduleFailure('No schedule was found!'))
    }
  } catch (err) {
    const reason = String(err)
    dispatch(actionRequestScheduleFailure(reason))
    throw reason
  }
}

export const actionCreateNewReminder = (reminderData: ReminderProps): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestReminderStart())

    const { reminder } = selectReminder(getState())

    const reminderList: ReminderProps[] = reminder ? [...reminder, reminderData] : [{ ...reminderData }]

    await Storage.set('reminderList', JSON.stringify(reminderList))

    dispatch(actionCreateNewReminderSuccess(reminderList))
  } catch (err) {
    const reason = String(err)
    dispatch(actionCreateNewReminderFailure(reason))
    throw reason
  }
}

export const actionUpdateAReminder = (reminderData: ReminderProps): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestReminderStart())

    const { reminder } = selectReminder(getState())

    if (!reminder || reminder.length === 0) {
      /** @todo: implement this error using better strategy */
      throw 'No reminder scheduled!'
    }

    const uuid = reminderData.id
    const newReminderList: ReminderProps[] = [...reminder]

    const index = newReminderList.findIndex(r => r.id === uuid)
    newReminderList[index] = Object.assign({ ...newReminderList[index] }, { ...reminderData })

    await Storage.set('reminderList', JSON.stringify(newReminderList))

    dispatch(actionUpdateAReminderSuccess(newReminderList))
  } catch (err) {
    const reason = String(err)
    dispatch(actionUpdateAReminderFailure(reason))
    throw reason
  }
}

export const actionDeleteAReminder = (reminderID: string): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestReminderStart())

    const { reminder } = selectReminder(getState())

    if (!reminder || reminder.length === 0) {
      /** @todo: implement this error using better strategy */
      throw 'No reminder scheduled!'
    }

    const newReminderList: ReminderProps[] = [...reminder]

    const index = newReminderList.findIndex(r => r.id === reminderID)
    newReminderList.splice(index, 1)

    await Storage.set('reminderList', JSON.stringify(newReminderList))

    dispatch(actionDeleteAReminderSuccess(newReminderList))
  } catch (err) {
    const reason = String(err)
    dispatch(actionDeleteAReminderFailure(reason))
    throw reason
  }
}

export const actionDeleteAllReminder = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(actionRequestReminderStart())

    const { reminder } = selectReminder(getState())

    if (!reminder || reminder.length === 0) {
      /** @todo: implement this error using better strategy */
      throw 'No reminder scheduled!'
    }

    await Storage.remove('reminderList')

    dispatch(actionDeleteAllReminderSuccess([]))
  } catch (err) {
    const reason = String(err)
    dispatch(actionDeleteAllReminderFailure(reason))
    throw reason
  }
}

/** @todo: create fetch actions to recover scheduler and reminders data */
