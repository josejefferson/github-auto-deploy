import send from '../config/email'
import variables from '../config/variables'
import { log, random } from '../helpers/helpers'

/**
 * Envia um e-mail avisando o início do deploy
 */
export function sendStartDeployEmail() {
  const title = `Deploy iniciado`
  const body = `O deploy da aplicação <b>${
    variables.appName
  }</b> foi iniciado às ${new Date().toLocaleString()}`
  sendEmail(title, body)
}

/**
 * Envia um e-mail avisando o sucesso do deploy
 */
export function sendSuccessDeployEmail() {
  const title = `✅ Deploy finalizado com sucesso`
  const body = `
		O deploy da aplicação <b>${variables.appName}</b> foi finalizado com sucesso!<br><br>
    <h4>DETALHES</h4>
    <ul>
			<li><b>Tempo:</b> ${variables.deployTime} segundos</li>
    </ul>
    <h4>LOGS DO GIT</h4>
		<pre>${variables.gitLogs}</pre>
		<h4>LOGS DO YARN</h4>
		<pre>${variables.yarnLogs}</pre>
	`
  sendEmail(title, body)
}

/**
 * Envia um e-mail avisando o erro do deploy
 */
export function sendErrorDeployEmail() {
  const title = '❌ Erro ao fazer deploy'
  const body = `
		Ocorreu um erro durante o deploy da aplicação <b>${variables.appName}</b><br><br>
    <h4>DETALHES DO ERRO</h4>
    <pre>${variables.deployError?.message + '\n\n' + variables.deployError?.stack}</pre>
    <h4>LOGS DO GIT</h4>
		<pre>${variables.gitLogs}</pre>
		<h4>LOGS DO YARN</h4>
		<pre>${variables.yarnLogs}</pre>
	`
  sendEmail(title, body)
}

/**
 * Envia um e-mail avisando o início de desfazer o deploy
 */
export function sendStartUndoDeployEmail() {
  const title = '↩ Desfazendo o deploy'
  const body = `Desfazendo o último deploy da aplicação <b>${variables.appName}</b>`
  sendEmail(title, body)
}

/**
 * Envia um e-mail avisando o sucesso de desfazer o deploy
 */
export function sendUndoDeployEmail() {
  const time = Math.round((Date.now() - variables.deployStartTime) / 1000)
  const title = '✅ Deploy desfeito'
  const body = `
		O deploy da aplicação <b>${variables.appName}</b> foi desfeito com sucesso<br><br>
    <h4>DETALHES</h4>
    <ul>
			<li><b>Tempo:</b> ${time} segundos</li>
    </ul>
    <h4>LOGS DO GIT</h4>
		<pre>${variables.gitLogs}</pre>
		<h4>LOGS DO YARN</h4>
		<pre>${variables.yarnLogs}</pre>
	`
  sendEmail(title, body)
}

/**
 * Envia um e-mail avisando o erro de desfazer o deploy
 */
export function sendErrorUndoDeployEmail() {
  const title = '❌ Erro ao desfazer deploy'
  const body = `
		Ocorreu um erro durante o processo de desfazer deploy da aplicação <b>${
      variables.appName
    }</b><br><br>
    <h4>DETALHES DO ERRO</h4>
    <pre>${variables.deployError?.message + '\n\n' + variables.deployError?.stack}</pre>
    <h4>LOGS DO GIT</h4>
		<pre>${variables.gitLogs}</pre>
		<h4>LOGS DO YARN</h4>
		<pre>${variables.yarnLogs}</pre>
	`
  sendEmail(title, body)
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

export function sendEmail(title: string, body: string) {
  const fullTitle = `[#${random(1000, 9999)}] ${variables.appName}: ${title}`
  send({
    to: variables.gmail.receivers,
    subject: fullTitle,
    html: body + footer
  })
    .then(() => {
      if (process.env.NODE_ENV === 'development') log('INFO', `E-mail "${fullTitle}" enviado`)
    })
    .catch((err) => {
      log('INFO', `Falha ao enviar e-mail "${title}":`)
      console.error(err)
    })
}
