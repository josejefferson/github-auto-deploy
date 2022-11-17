import variables from '../config/variables'
import { run } from '../helpers/helpers'

/**
 * Instala as dependências
 */
export async function yarnInstall() {
  console.log('[INFO] Executando "yarn"')
  const { error, stdout, stderr } = await run('yarn')
  variables.yarnLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}

/**
 * Faz o build da aplicação
 */
export async function yarnBuild() {
  console.log('[INFO] Executando "yarn build"')
  const { error, stdout, stderr } = await run('yarn build')
  variables.yarnLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}
