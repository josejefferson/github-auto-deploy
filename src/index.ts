console.clear()
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import variables from './config/variables'
import { deploy } from './helpers/deploy'
import { log } from './helpers/helpers'
import verifySecret from './helpers/verify-secret'
const app = express()
const router = express.Router()

const PORT = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(
  express.json({
    verify: (req: any, res, buf, encoding: any) => {
      if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8')
    }
  })
)
app.use(variables.pathName, router)

router.post('/', variables.secret ? verifySecret : [], (req, res) => {
  if (req.body?.ref !== `refs/heads/${variables.branch}`) {
    log('WARNING', `O commit não pertence à branch ${variables.branch}, o deploy não será feito`)
    return
  }

  variables.pendingDeploy = true
  if (!variables.deploying) {
    log('INFO', `Deploy iniciado às ${new Date().toLocaleString()} por "${req.body?.pusher?.name}"`)
    deploy()
  } else {
    log(
      'WARNING',
      'Já há um deploy em andamento, este será iniciado após a finalização do anterior'
    )
  }

  res.sendStatus(200)
})

router.get('/status', (req, res) => {
  res.json({
    deploying: variables.deploying
  })
})

app.listen(PORT, () => {
  log('INFO', 'Servidor webhook iniciado na porta ' + PORT)
  log('INFO', 'Aguardando deployments...')
})
