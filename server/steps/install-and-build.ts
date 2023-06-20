import { sendUpdate } from '../config/realtime'
import { log, run } from '../helpers/helpers'
import { IAppState } from '../types'

/**
 * Instala as dependências
 */
export async function install(app: IAppState) {
  if (app.installCommand === null) return
  app.status = 'install'
  sendUpdate(app, 'status')
  log('INFO', 'Instalando dependências')
  const { error, stdout, stderr } = await run(app, app.installCommand)
  app.logs.install += [stdout, stderr].join('\n')
  sendUpdate(app, 'logs.install')
  if (error) throw error
}

/**
 * Faz o build da aplicação
 */
export async function build(app: IAppState) {
  if (app.buildCommand === null) return
  app.status = 'build'
  sendUpdate(app, 'status')
  log('INFO', 'Realizando o build')
  const { error, stdout, stderr } = await run(app, app.buildCommand)
  app.logs.build += [stdout, stderr].join('\n')
  sendUpdate(app, 'logs.build')
  if (error) throw error
}