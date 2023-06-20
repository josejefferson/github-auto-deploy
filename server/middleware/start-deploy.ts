import { Request, Response } from 'express'
import { state } from '../config/config'
import { log } from '../helpers/helpers'
import { deploy } from '../helpers/deploy'
import { sendUpdate } from '../config/realtime'

export default function startDeploy(req: Request, res: Response) {
  if (
    process.env.NODE_ENV !== 'development' &&
    req.body?.ref !== `refs/heads/${req.deployApp.gitBranch}`
  ) {
    log(
      'WARNING',
      `O commit não pertence à branch ${req.deployApp.gitBranch}, o deploy não será realizado`
    )
    return
  }

  req.deployApp.pendingDeploy = true
  sendUpdate(req.deployApp, 'pendingDeploy')

  const busy = state.apps.some((app) => app.deploying)
  if (!busy) {
    log(
      'INFO',
      `Deploy da aplicação "${
        req.deployApp.displayName
      }" iniciado às ${new Date().toLocaleString()} por "${req.body?.pusher?.name}"`
    )
    deploy(req.deployApp)
  } else {
    log(
      'WARNING',
      `Já há um deploy em andamento, o deploy da aplicação "${req.deployApp.displayName}" será iniciado após a finalização do(s) anterior(es)`
    )
  }

  res.sendStatus(200)
}
