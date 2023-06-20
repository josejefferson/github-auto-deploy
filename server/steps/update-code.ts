import { sendUpdate } from '../config/realtime'
import { log, run } from '../helpers/helpers'
import { IAppState } from '../types'

export async function resetAndClean(app: IAppState) {
  if (app.resetCommand !== null) {
    app.status = 'reset'
    sendUpdate(app, 'status')
    log('INFO', 'Resetando o repositório')
    const { error, stdout, stderr } = await run(app, app.resetCommand)
    app.logs.reset += [stdout, stderr].join('\n')
    sendUpdate(app, 'logs.reset')
    if (error) throw error
  }

  if (app.cleanCommand !== null) {
    app.status = 'clean'
    sendUpdate(app, 'status')
    log('INFO', 'Limpando o repositório')
    const { error, stdout, stderr } = await run(app, app.cleanCommand)
    app.logs.clean += [stdout, stderr].join('\n')
    sendUpdate(app, 'logs.clean')
    if (error) throw error
  }
}

export async function pull(app: IAppState) {
  if (app.pullCommand === null) return
  app.status = 'pull'
  sendUpdate(app, 'status')
  log('INFO', 'Baixando atualizações')
  const { error, stdout, stderr } = await run(app, app.pullCommand)
  app.logs.pull += [stdout, stderr].join('\n')
  sendUpdate(app, 'logs.pull')
  if (error) throw error
}
