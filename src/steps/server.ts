import variables from '../config/variables'
import { log, run } from '../helpers/helpers'

/**
 * Para o servidor
 */
export async function stopServer() {
  log('INFO', 'Parando serviço')
  const { error } = await run(`sudo systemctl stop ${variables.serviceName}`)
  if (error) log('WARNING', 'Falha ao parar o serviço:', error.message)
}

/**
 * Inicia o servidor
 */
export async function startServer() {
  log('INFO', 'Iniciando serviço')
  const { error } = await run(`sudo systemctl start ${variables.serviceName}`)
  if (error) log('WARNING', 'Falha ao iniciar o serviço:', error.message)
}

/**
 * Reinicia o servidor
 */
export async function restartServer() {
  log('INFO', 'Reiniciando serviço')
  const { error } = await run(`sudo systemctl restart ${variables.serviceName}`)
  if (error) log('WARNING', 'Falha ao reiniciar o serviço:', error.message)
}
