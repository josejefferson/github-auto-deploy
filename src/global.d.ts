import { IAppState } from './types'

export {}

declare global {
  namespace Express {
    interface Request {
      rawBody: any
      deployApp: IAppState
    }
  }
}
