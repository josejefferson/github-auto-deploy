import { readFileSync } from 'fs'
import { log } from '../helpers/helpers'
import YAML from 'yaml'
import { IConfig, IState } from '../types'
import validateConfig from '../helpers/config-validator'

let configStr = ''
try {
  configStr = readFileSync('config.yml', { encoding: 'utf-8' })
} catch (err) {
  log(
    'ERROR',
    'Erro ao ler o arquivo de configuração "config.yml". Verifique se ele existe, caso não exista crie-o'
  )
  process.exit(1)
}

const rawConfig: any = YAML.parse(configStr)

export const config: IConfig = validateConfig(rawConfig)

export const state: IState = {
  ...config,
  deploying: false,
  apps: config.apps.map((app) => ({
    ...app,
    deploying: false,
    status: 'none',
    pendingDeploy: false,
    deployStartTime: 0,
    deployTime: 0,
    deployError: '',
    logs: {
      reset: '',
      clean: '',
      pull: '',
      install: '',
      build: ''
    }
  }))
}

log('INFO', 'Configuração carregada do arquivo "config.yml"')

if (!config.gmail) {
  log('WARNING', 'E-mail desativado')
}

if (config.gmail?.receivers.length) {
  log(
    'INFO',
    'Por padrão, os e-mails de deploy serão enviados para: ' + config.gmail?.receivers.join(', ')
  )
}

log('INFO', config.apps.length + ' app(s) configurado(s) para deploy')
