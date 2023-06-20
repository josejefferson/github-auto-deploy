import EventEmitter from 'events'
import { IAppState } from '../types'
import { getDeepValue } from '../helpers/helpers'

export const realtime = new EventEmitter()

export function sendUpdate(app: IAppState, ...keys: string[]) {
  const data = keys.map((key) => {
    return [key, getDeepValue(app, key)]
  })
  realtime.emit('update', { id: app.id, data })
}
