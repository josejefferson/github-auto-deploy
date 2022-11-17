import variables from '../config/variables'
import { log, run } from '../helpers/helpers'

/**
 * Instala as dependências
 */
export async function yarnInstall() {
  log('INFO', 'Executando "yarn"')
  const { error, stdout, stderr } = await run('yarn')
  variables.yarnLogs +=
    `
+--------------+
| YARN INSTALL |
+--------------+
`.trim() + '\n'
  variables.yarnLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}

/**
 * Faz o build da aplicação
 */
export async function yarnBuild() {
  log('INFO', 'Executando "yarn build"')
  const { error, stdout, stderr } = await run('yarn build')
  variables.yarnLogs +=
    `
+--------------+
|  YARN BUILD  |
+--------------+
`.trim() + '\n'
  variables.yarnLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}
