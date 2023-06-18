import express, { Request, Response } from 'express'
import { deploy } from '../helpers/deploy'
import { log } from '../helpers/helpers'
import verifySecret from '../helpers/verify-secret'
import injectApp from '../middleware/inject-app'
import { config, state } from './config'
import startDeploy from '../middleware/start-deploy'

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

app.use(config.urlPath, router)

router.post('/:app', injectApp, verifySecret, startDeploy)
if (process.env.NODE_ENV === 'development') {
  router.get('/:app', injectApp, verifySecret, startDeploy)
}

app.listen(config.port, () => {
  log('INFO', 'Servidor webhook iniciado na porta ' + config.port)
  log('INFO', 'Aguardando deployments...')
})
