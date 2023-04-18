import variables from '../config/variables'
import { restoreLastBackup } from '../steps/backup'
import { dockerBuild } from '../steps/docker'
import {
  sendErrorDeployEmail,
  sendErrorUndoDeployEmail,
  sendStartDeployEmail,
  sendStartUndoDeployEmail,
  sendSuccessDeployEmail,
  sendUndoDeployEmail
} from '../steps/email'
import { gitPull, gitReset } from '../steps/git'
import { startServer, stopServer } from '../steps/server'
import { log, sleep } from './helpers'

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
      log('INFO', `Deploy finalizado. Tempo: ${time} segundos`)
    })
    .catch((err) => {
      log('ERROR', 'Ocorreu um erro no deploy:')
      console.error(err)
    })
    .finally(() => {
      variables.deploying = false
      if (variables.pendingDeploy) {
        log('INFO', `Deploy pendente iniciado às ${new Date().toLocaleString()}`)
        deploy()
      }
    })
}

/** Faz um deploy */
export async function startDeploy() {
  try {
    sendStartDeployEmail() // Envia um e-mail avisando que o deploy iniciou
    // await backupServer() // Faz um backup do servidor
  } catch (err) {
    variables.deployError = err
    sendErrorDeployEmail() // Envia um e-mail avisando que houve falha no deploy
    startServer()
    return
  }
  
  try {
    await gitReset() // Apaga qualquer alteração no git
    await gitPull() // Baixa as novas atualizações
    // await yarnInstall() // Instala as dependências atualizadas
    // await yarnBuild() // Faz o build da aplicação
    await dockerBuild()
    await stopServer() // Para o servidor
    await sleep(3000) // Aguarda 3 segundos
    await startServer() // Inicia o servidor
    sendSuccessDeployEmail() // Envia um e-mail avisando que houve sucesso no deploy
  } catch (err) {
    log('ERROR', 'Ocorreu um erro ao fazer deploy, desfazendo')
    console.error(err)
    variables.deployError = err
    sendErrorDeployEmail() // Envia um e-mail avisando que houve falha no deploy
    // await undoDeploy() // Desfaz o deploy
  }
}

/** Desfaz um deploy */
export async function undoDeploy() {
  log('INFO', 'Desfazendo deploy')
  try {
    sendStartUndoDeployEmail() // Envia um e-mail avisando que está desfazendo as alterações
    await stopServer() // Para o servidor
    await sleep(5000) // Aguarda 5 segundos
    await restoreLastBackup() // Restaura o último backup
    await startServer() // Inicia o servidor
    sendUndoDeployEmail() // Envia um e-mail avisando que houve sucesso na restauração do servidor
  } catch (err) {
    log('ERROR', 'Ocorreu um erro ao desfazer deploy')
    console.error(err)
    variables.deployError = err
    sendErrorUndoDeployEmail() // Envia um e-mail avisando que está desfazendo as alterações
    await startServer() // Inicia o servidor
  }
}
