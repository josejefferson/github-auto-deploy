import variables from '../config/variables'
import { run } from '../helpers/helpers'

export async function stopServer() {
  const { error } = await run(`sudo systemctl stop ${variables.serviceName}`)
  if (error) console.log('[WARNING] Falha ao parar o serviço:', error.message)
}

export async function startServer() {
  const { error } = await run(`sudo systemctl start ${variables.serviceName}`)
  if (error) console.log('[WARNING] Falha ao iniciar o serviço:', error.message)
}
