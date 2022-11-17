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
    exec(command, { cwd: variables.pathName }, (error, stdout, stderr) => {
      resolve({ error, stdout, stderr })
    })
  })
}
