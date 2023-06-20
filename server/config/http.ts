import express, { NextFunction, Request, Response } from 'express'
import { sseMiddleware } from 'express-sse-middleware'
import EventBuilder from 'express-sse-middleware/dist/EventBuilder'
import { authorizer, log } from '../helpers/helpers'
import verifySecret from '../helpers/verify-secret'
import injectApp from '../middleware/inject-app'
import startDeploy from '../middleware/start-deploy'
import { config, state } from './config'
import { realtime } from './realtime'
import expressBasicAuth from 'express-basic-auth'

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: true }))
app.use(
  express.json({
    verify: (req: Request, res, buf, encoding: any) => {
      if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8')
    }
  })
)
app.use(sseMiddleware)

app.use(config.urlPath, router)

const users: Record<string, string> = {}
config.users.forEach((user) => {
  users[user.username] = user.password
})

const auth =
  process.env.NODE_ENV !== 'development'
    ? expressBasicAuth({
        authorizer: authorizer(users),
        challenge: true
      })
    : []

router.get('/state', auth, (req: Request, res: Response) => {
  res.json(state)
})

router.use('/realtime', auth, (req: Request, res: Response) => {
  const sse = res.sse()

  const sendUpdate = (data: any) => sse.send(new EventBuilder().event('update').data(data).build())
  realtime.on('update', sendUpdate)

  res.on('close', () => {
    realtime.off('update', sendUpdate)
  })
})

router.post('/deploy/:app', injectApp, verifySecret, startDeploy)
if (process.env.NODE_ENV === 'development') {
  router.get('/deploy/:app', injectApp, verifySecret, startDeploy)
}

// Next.JS

const handler =
  process.env.NODE_ENV === 'development'
    ? import('./next-handler')
    : Promise.resolve({ default: express.static('out') })

app.get('*', auth, (req: Request, res: Response, next: NextFunction) => {
  handler.then(({ default: handler }) => {
    return handler(req, res, next as any)
  })
})

app.listen(config.port, () => {
  log('INFO', 'Servidor webhook iniciado na porta ' + config.port)
  log('INFO', 'Aguardando deployments...')
})
