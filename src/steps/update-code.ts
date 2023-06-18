import { log, run } from '../helpers/helpers'
import { IAppState } from '../types'

export async function resetAndClean(app: IAppState) {
  if (app.resetCommand !== null) {
    app.status = 'reset'
    log('INFO', 'Resetando o repositório')
    const { error, stdout, stderr } = await run(app, app.resetCommand)
    app.logs.reset += [stdout, stderr].join('\n')
    if (error) throw error
  }

  if (app.cleanCommand !== null) {
    app.status = 'clean'
    log('INFO', 'Limpando o repositório')
    const { error, stdout, stderr } = await run(app, app.cleanCommand)
    app.logs.clean += [stdout, stderr].join('\n')
    if (error) throw error
  }
}

export async function pull(app: IAppState) {
  if (app.pullCommand === null) return
  app.status = 'pull'
  log('INFO', 'Baixando atualizações')
  const { error, stdout, stderr } = await run(app, app.pullCommand)
  app.logs.pull += [stdout, stderr].join('\n')
  if (error) throw error
}
