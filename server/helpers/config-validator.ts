import { array, boolean, number, object, setLocale, string } from 'yup'
import { pt } from 'yup-locale-pt'
import { log } from './helpers'
setLocale(pt)

const configSchema = object({
  port: number()
    .integer()
    .positive()
    .min(1)
    .max(65535)
    .default(Number(process.env.PORT || 3000)),
  urlPath: string().default('/'),
  gmail: object({
    name: string().default('Sistema de deploy automático via GitHub'),
    email: string().email().required(),
    clientID: string().required(),
    clientSecret: string().required(),
    refreshToken: string().required(),
    receivers: array(string().email().required()).default([])
  })
    .nullable()
    .default(null),
  apps: array(
    object({
      id: string().required(),
      displayName: string().required(),
      gitBranch: string().default('main'),
      githubWebhookSecret: string().required(),
      folderAbsolutePath: string().required(),
      gmailReceivers: array(string().email().required()).nullable().default(null),
      systemdServiceName: string().default(''),
      stopCommand: string().nullable().default('sudo systemctl stop #'),
      startCommand: string().nullable().default('sudo systemctl start #'),
      backupAbsolutePath: string().nullable().default(''),
      resetCommand: string().nullable().default('git reset --hard'),
      cleanCommand: string().nullable().default('git clean -f -d'),
      pullCommand: string().nullable().default('git pull'),
      installCommand: string().nullable().default('yarn install --production=false'),
      buildCommand: string().nullable().default('yarn build'),
      undoWhenFailed: boolean().default(true)
    }).required()
  ).required(),
  users: array(
    object({
      name: string().required(),
      username: string().required(),
      password: string().required()
    })
  ).default([])
})

export default function validateConfig(config: any) {
  try {
    configSchema.validateSync(config)
    return configSchema.cast(config, { stripUnknown: true })
  } catch (err: any) {
    log('ERROR', 'Erro na validação da configuração "config.yml": ', err.message)
    process.exit(1)
  }
}
