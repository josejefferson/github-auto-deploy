console.clear()
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { deploy } from './helpers/deploy'
import variables from './config/variables'
import verifySecret from './helpers/verify-secret'
const app = express()
const router = express.Router()

const PORT = process.env.PORT

//todo: criar função de log com cores e data/hora
app.use(variables.pathName, router)
app.use(express.urlencoded({ extended: true }))
app.use(
  express.json({
    verify: (req: any, res, buf, encoding: any) => {
      if (buf && buf.length) req.rawBody = buf.toString(encoding || 'utf8')
    }
  })
)

router.post(variables.pathName, variables.secret ? verifySecret : [], (req, res) => {
  if (req.body?.ref !== `refs/heads/${variables.branch}`) {
    console.log(
      `[WARNING] O commit não pertence à branch ${variables.branch}, o deploy não será feito`
    )
    return
  }

  console.log(
    `[INFO] Deploy iniciado às ${new Date().toLocaleString()} por "${req.body?.pusher?.name}"`
  )
  variables.pendingDeploy = true
  if (!variables.deploying) deploy()
  res.sendStatus(200)
})

router.get('/status', (req, res) => {
  res.json({
    deploying: variables.deploying
  })
})

app.listen(PORT, () => {
  console.log('[INFO] Servidor webhook iniciado na porta ' + PORT)
  console.log('[INFO] Aguardando deployments...')
})
