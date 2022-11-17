import variables from '../config/variables'
import { log, run } from '../helpers/helpers'

export async function gitReset() {
  log('INFO', 'Executando "git reset --hard"')
  const { error: err1, stdout: sout1, stderr: serr1 } = await run('git reset --hard')
  variables.gitLogs +=
    `
+---------------+
|   GIT RESET   |
+---------------+
`.trim() + '\n'
  variables.gitLogs += [sout1, serr1].join('\n') + '\n'
  if (err1) throw err1

  log('INFO', 'Executando "git clean -f -d"')
  const { error: err2, stdout: sout2, stderr: serr2 } = await run('git clean -f -d')
  variables.gitLogs +=
    `
+---------------+
|   GIT CLEAN   |
+---------------+
`.trim() + '\n'
  variables.gitLogs += [sout2, serr2].join('\n') + '\n'
  if (err2) throw err2
}

export async function gitPull() {
  log('INFO', 'Executando "git pull"')
  const { error, stdout, stderr } = await run('git pull')
  variables.gitLogs +=
    `
+--------------+
|   GIT PULL   |
+--------------+
`.trim() + '\n'
  variables.gitLogs += [stdout, stderr].join('\n') + '\n'
  if (error) throw error
}
