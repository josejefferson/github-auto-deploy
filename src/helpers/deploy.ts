import { state } from '../config/config'
import { backupServer, restoreLastBackup } from '../steps/backup'
import {
  sendErrorDeployEmail,
  sendErrorUndoDeployEmail,
  sendStartDeployEmail,
  sendStartUndoDeployEmail,
  sendSuccessDeployEmail,
  sendUndoDeployEmail
} from '../steps/email'
import { pull, resetAndClean } from '../steps/update-code'
import { startServer, stopServer } from '../steps/server'
import { build, install } from '../steps/install-and-build'
import { IAppState } from '../types'
import { log, sleep } from './helpers'

export async function deploy(app: IAppState) {
  app.deployError = ''
  app.logs.reset = ''
  app.logs.clean = ''
  app.logs.pull = ''
  app.logs.install = ''
  app.logs.build = ''
  app.deploying = true
  app.deployStartTime = Date.now()
  app.pendingDeploy = false
  startDeploy(app)
    .then(() => {
      const time = Math.round((Date.now() - app.deployStartTime) / 1000)
      app.deployTime = time
      log('OK', `Deploy finalizado. Tempo: ${time} segundos`)
    })
    .catch((err) => {
      log('ERROR', 'Ocorreu um erro no deploy:')
      console.error(err)
    })
    .finally(() => {
      app.deploying = false
      const nextDeploy = state.apps.find((app) => app.pendingDeploy)
      if (nextDeploy) {
        log(
          'INFO',
          `Deploy pendente da aplicação "${
            nextDeploy.displayName
          }" iniciado às ${new Date().toLocaleString()}`
        )
        deploy(nextDeploy)
      }
    })
}

/** Faz um deploy */
export async function startDeploy(app: IAppState) {
  try {
    sendStartDeployEmail(app) // Envia um e-mail avisando que o deploy iniciou
    await stopServer(app) // Para o servidor
    await sleep(3000) // Aguarda 3 segundos
    await backupServer(app) // Faz um backup do servidor
  } catch (err: any) {
    app.status = 'error'
    app.deployError = err?.message + '\n' + err?.stack
    sendErrorDeployEmail(app) // Envia um e-mail avisando que houve falha no deploy
    startServer(app)
    return
  }

  try {
    await resetAndClean(app) // Apaga qualquer alteração no git
    await pull(app) // Baixa as novas atualizações
    await install(app) // Instala as dependências atualizadas
    await build(app) // Faz o build da aplicação
    await startServer(app) // Inicia o servidor
    sendSuccessDeployEmail(app) // Envia um e-mail avisando que houve sucesso no deploy
  } catch (err: any) {
    log('ERROR', 'Ocorreu um erro ao fazer o deploy')
    console.error(err)
    app.deployError = err?.message + '\n' + err?.stack
    sendErrorDeployEmail(app) // Envia um e-mail avisando que houve falha no deploy
    await undoDeploy(app) // Desfaz o deploy
  }
}

/** Desfaz um deploy */
export async function undoDeploy(app: IAppState) {
  if (app.backupAbsolutePath === null || !app.undoWhenFailed) return
  log('INFO', 'Desfazendo deploy')
  try {
    sendStartUndoDeployEmail(app) // Envia um e-mail avisando que está desfazendo as alterações
    await stopServer(app) // Para o servidor
    await sleep(3000) // Aguarda 3 segundos
    await restoreLastBackup(app) // Restaura o último backup
    await startServer(app) // Inicia o servidor
    sendUndoDeployEmail(app) // Envia um e-mail avisando que houve sucesso na restauração do servidor
    app.status = 'restored'
  } catch (err: any) {
    log('ERROR', 'Ocorreu um erro ao desfazer deploy')
    console.error(err)
    app.deployError = err?.message + '\n' + err?.stack
    sendErrorUndoDeployEmail(app) // Envia um e-mail avisando houve um erro ao desfazer as alterações
    await startServer(app) // Inicia o servidor
    app.status = 'error'
  }
}
