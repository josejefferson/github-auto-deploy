import variables from '../config/variables'
import { log, run } from '../helpers/helpers'

/**
 * Instala as dependências
 */
export async function dockerBuild() {
  log('INFO', 'Executando "docker-compose build"')
  const { error, stdout, stderr } = await run('docker-compose build')
  variables.yarnLogs +=
    `
+--------------+
| DOCKER BUILD |
+--------------+
`.trim() + '\n'
  variables.yarnLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}
