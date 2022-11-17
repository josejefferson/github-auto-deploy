import chalk from 'chalk'
import { exec } from 'child_process'
import variables from '../config/variables'

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export function run(command: string) {
  if (process.env.NODE_ENV === 'development') console.log('$', command)
  return new Promise<{ error: any; stdout: string; stderr: string }>((resolve) => {
    exec(command, { cwd: variables.folderPath }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr })
    })
  })
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function log(level: string, ...contents: any[]) {
  const time = new Date().toLocaleTimeString()
  let str = ''
  str += chalk.gray(time) + ' ['
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
