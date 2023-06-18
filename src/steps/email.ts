import { config } from '../config/config'
import send from '../config/email'
import { log, makeEmailLogs, random } from '../helpers/helpers'
import { IAppState } from '../types'

/**
 * Envia um e-mail avisando o início do deploy
 */
export function sendStartDeployEmail(app: IAppState) {
  const title = `Deploy iniciado`
  const body = `O deploy da aplicação <b>${
    app.displayName
  }</b> foi iniciado às ${new Date().toLocaleString()}`
  sendEmail(app, title, body)
}

/**
 * Envia um e-mail avisando o sucesso do deploy
 */
export function sendSuccessDeployEmail(app: IAppState) {
  const title = `✅ Deploy finalizado com sucesso`
  let body = `
		O deploy da aplicação <b>${app.displayName}</b> foi finalizado com sucesso!<br><br>
    <h3>DETALHES</h3>
    <ul>
			<li><b>Tempo:</b> ${app.deployTime} segundos</li>
    </ul>
	`
  body += makeEmailLogs(app)
  sendEmail(app, title, body)
}

/**
 * Envia um e-mail avisando o erro do deploy
 */
export function sendErrorDeployEmail(app: IAppState) {
  const title = '❌ Erro ao fazer deploy'
  let body = `
		Ocorreu um erro durante o deploy da aplicação <b>${app.displayName}</b><br><br>
    <h3>DETALHES DO ERRO</h3>
    <pre>${app.deployError}</pre>
	`
  body += makeEmailLogs(app)
  sendEmail(app, title, body)
}

/**
 * Envia um e-mail avisando o início de desfazer o deploy
 */
export function sendStartUndoDeployEmail(app: IAppState) {
  const title = '↩ Desfazendo o deploy'
  const body = `Desfazendo o último deploy da aplicação <b>${app.displayName}</b>`
  sendEmail(app, title, body)
}

/**
 * Envia um e-mail avisando o sucesso de desfazer o deploy
 */
export function sendUndoDeployEmail(app: IAppState) {
  const time = Math.round((Date.now() - app.deployStartTime) / 1000)
  const title = '✅ Deploy desfeito'
  let body = `
		O deploy da aplicação <b>${app.displayName}</b> foi desfeito com sucesso<br><br>
    <h3>DETALHES</h3>
    <ul>
			<li><b>Tempo:</b> ${time} segundos</li>
    </ul>
	`
  body += makeEmailLogs(app)
  sendEmail(app, title, body)
}

/**
 * Envia um e-mail avisando o erro de desfazer o deploy
 */
export function sendErrorUndoDeployEmail(app: IAppState) {
  const title = '❌ Erro ao desfazer deploy'
  let body = `
		Ocorreu um erro durante o processo de desfazer deploy da aplicação <b>${app.displayName}</b><br><br>
    <h3>DETALHES DO ERRO</h3>
    <pre>${app.deployError}</pre>
	`
  body += makeEmailLogs(app)
  sendEmail(app, title, body)
}

const footer = `
<div style="padding-top: 10px; border-bottom: 1px solid #acacac;"></div>

<div style="padding-top: 10px; color: #acacac">
  Este email foi enviado automaticamente pelo sistema de deploy automático via GitHub.<br>
  Não responder a este e-mail.<br>
  Este NÃO é um e-mail oficial do GitHub Inc.<br>
  <a href="https://github.com/josejefferson/github-auto-deploy" style="color: #acacac;">Link do projeto no GitHub</a>
</div>
`

/**
 * Envia um e-mail
 */

export function sendEmail(app: IAppState, title: string, body: string) {
  const to = app.gmailReceivers || config.gmail?.receivers || []
  if (!to.length) return
  const fullTitle = `[#${random(1000, 9999)}] ${app.displayName}: ${title}`
  send({ to, subject: fullTitle, html: body + footer })
    .then(() => {
      if (process.env.NODE_ENV === 'development') log('INFO', `E-mail "${fullTitle}" enviado`)
    })
    .catch((err) => {
      log('INFO', `Falha ao enviar e-mail "${title}":`)
      console.error(err)
    })
}
