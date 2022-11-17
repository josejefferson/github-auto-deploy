import {
  sendStartDeployEmail,
  sendSuccessDeployEmail,
  sendErrorDeployEmail,
  sendUndoDeployEmail,
  sendStartUndoDeployEmail,
  sendErrorUndoDeployEmail
} from '../steps/email'
import { sleep } from './helpers'
import variables from '../config/variables'
import { startServer, stopServer } from '../steps/server'
import { gitPull, gitReset } from '../steps/git'
import { yarnBuild, yarnInstall } from '../steps/yarn'
import { backupFailedServer, backupServer, restoreLastBackup } from '../steps/backup'

export async function deploy() {
  variables.deployError = ''
  variables.gitLogs = ''
  variables.yarnLogs = ''
  variables.deploying = true
  variables.deployStartTime = Date.now()
  variables.pendingDeploy = false
  startDeploy()
    .then(() => {
      const time = Math.round((Date.now() - variables.deployStartTime) / 1000)
      variables.deployTime = time
      console.log(`[INFO] Deploy finalizado. Tempo: ${time} segundos`)
    })
    .catch((err) => {
      console.log('[ERROR] Ocorreu um erro no deploy:')
      console.error(err)
    })
    .finally(() => {
      variables.deploying = false
      if (variables.pendingDeploy) deploy()
    })
}

/** Faz um deploy */
export async function startDeploy() {
  try {
    sendStartDeployEmail() // Envia um e-mail avisando que o deploy iniciou
    await stopServer() // Para o servidor
    await sleep(5000) // Aguarda 5 segundos
    await backupServer() // Faz um backup do servidor
  } catch (err) {
    variables.deployError = err
    sendErrorDeployEmail() // Envia um e-mail avisando que houve falha no deploy
    startServer()
    return
  }

  try {
    await gitReset() // Apaga qualquer alteração no git
    await gitPull() // Baixa as novas atualizações
    await yarnInstall() // Instala as dependências atualizadas
    await yarnBuild() // Faz o build da aplicação
    await startServer() // Inicia o servidor
    sendSuccessDeployEmail() // Envia um e-mail avisando que houve sucesso no deploy
  } catch (err) {
    variables.deployError = err
    sendErrorDeployEmail() // Envia um e-mail avisando que houve falha no deploy
    await undoDeploy() // Desfaz o deploy
  }
}

/** Desfaz um deploy */
export async function undoDeploy() {
  try {
    sendStartUndoDeployEmail() // Envia um e-mail avisando que está desfazendo as alterações
    await stopServer() // Para o servidor
    await sleep(5000) // Aguarda 5 segundos
    await restoreLastBackup() // Restaura o último backup
    await startServer() // Inicia o servidor
    sendUndoDeployEmail() // Envia um e-mail avisando que houve sucesso na restauração do servidor
  } catch (err) {
    variables.deployError = err
    sendErrorUndoDeployEmail() // Envia um e-mail avisando que está desfazendo as alterações
    await startServer() // Inicia o servidor
  }
}
