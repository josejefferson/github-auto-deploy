import { sendUpdate } from '../config/realtime'
import { log, run } from '../helpers/helpers'
import { IAppState } from '../types'

/**
 * Para o servidor
 */
export async function stopServer(app: IAppState) {
  if (app.stopCommand === null) return
  app.status = 'stop'
  sendUpdate(app, 'status')
  log('INFO', 'Parando serviço')
  const { error } = await run(app, app.stopCommand.replace('#', app.systemdServiceName || '#'))
  if (error) log('WARNING', 'Falha ao parar o serviço:', error.message)
}

/**
 * Inicia o servidor
 */
export async function startServer(app: IAppState) {
  if (app.startCommand === null) return
  app.status = 'start'
  sendUpdate(app, 'status')
  log('INFO', 'Iniciando serviço')
  const { error } = await run(app, app.startCommand.replace('#', app.systemdServiceName || '#'))
  if (error) log('WARNING', 'Falha ao iniciar o serviço:', error.message)
}
