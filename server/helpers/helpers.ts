import { compareSync } from 'bcrypt'
import chalk from 'chalk'
import { exec } from 'child_process'
import { IAppState } from '../types'

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function run(app: IAppState, command: string) {
  if (process.env.NODE_ENV === 'development') console.log('$', command)
  return new Promise<{ error: any; stdout: string; stderr: string }>((resolve) => {
    exec(command, { cwd: app.folderAbsolutePath }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr })
    })
  })
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function log(level: string, ...contents: any[]) {
  const date = new Date()
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const fmtDate = `${day}/${month} ${hours}:${minutes}:${seconds}`

  let str = ''
  str += chalk.gray(fmtDate) + ' ['
  switch (level.toLowerCase()) {
    case 'error':
      str += chalk.redBright(level)
      break
    case 'failed':
      str += chalk.redBright(level)
      break
    case 'success':
      str += chalk.greenBright(level)
      break
    case 'ok':
      str += chalk.greenBright(level)
      break
    case 'event':
      str += chalk.magentaBright(level)
      break
    case 'info':
      str += chalk.cyanBright(level)
      break
    case 'warning':
      str += chalk.yellowBright(level)
      break
    default:
      str += level
  }
  str += ']'
  console.log(str, ...contents)
}

export function makeEmailLogs(app: IAppState) {
  let text = ''

  if (app.logs.reset || app.logs.clean || app.logs.pull || app.logs.install || app.logs.build) {
    text += '<h3>LOGS</h3>'
  }

  if (app.logs.reset) text += `<h4>RESET (${app.resetCommand})</h4><pre>${app.logs.reset}</pre>`
  if (app.logs.clean) text += `<h4>CLEAN (${app.cleanCommand})</h4><pre>${app.logs.clean}</pre>`
  if (app.logs.pull) text += `<h4>PULL (${app.pullCommand})</h4><pre>${app.logs.pull}</pre>`
  if (app.logs.install)
    text += `<h4>INSTALL (${app.installCommand})</h4><pre>${app.logs.install}</pre>`
  if (app.logs.build) text += `<h4>BUILD (${app.buildCommand})</h4><pre>${app.logs.build}</pre>`
  return text
}

export function getDeepValue(obj: any, path: string) {
  let result = obj
  const paths = path.split('.')
  for (const p of paths) {
    if (result === null || result === undefined) return
    result = result[p]
  }
  return result
}

export function authorizer(users: any) {
  return (user: string, password: string) => {
    if (users[user] === undefined) {
      return false
    }
    const correct = compareSync(password, users[user])
    return correct
  }
}
