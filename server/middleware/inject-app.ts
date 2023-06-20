import { NextFunction, Request, Response } from 'express'
import { state } from '../config/config'
import { log } from '../helpers/helpers'

export default function injectApp(req: Request, res: Response, next: NextFunction) {
  if (!req.params.app) {
    return res.sendStatus(404)
  }

  const app = state.apps.find((app) => app.id === req.params.app)
  if (!app) {
    log('ERROR', `App "${req.params.app}" não encontrado`)
    return res.sendStatus(400)
  }

  req.deployApp = app
  next()
}
