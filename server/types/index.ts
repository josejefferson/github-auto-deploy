export interface IApp {
  id: string
  displayName: string
  gitBranch: string
  githubWebhookSecret: string
  folderAbsolutePath: string
  systemdServiceName: string | null
  gmailReceivers: string[] | null
  stopCommand: string | null
  startCommand: string | null
  backupAbsolutePath: string | null
  resetCommand: string | null
  cleanCommand: string | null
  pullCommand: string | null
  installCommand: string | null
  buildCommand: string | null
  undoWhenFailed: boolean
}
export interface IUser {
  name: string
  username: string
  password: string
}

export interface IConfig {
  urlPath: string
  port: number
  gmail?: {
    name: string
    email: string
    clientID: string
    clientSecret: string
    refreshToken: string
    receivers: string[]
  } | null
  apps: IApp[]
  users: IUser[]
}

export interface IAppState extends IApp {
  deploying: boolean
  status:
    | 'stop'
    | 'backup'
    | 'backupBroken'
    | 'reset'
    | 'clean'
    | 'pull'
    | 'install'
    | 'build'
    | 'start'
    | 'undo'
    | 'error'
    | 'restored'
    | 'success'
    | 'none'
  pendingDeploy: boolean
  deployStartTime: number
  deployTime: number
  deployError: string
  logs: {
    reset: string
    clean: string
    pull: string
    install: string
    build: string
  }
}

export interface IState extends IConfig {
  deploying: boolean
  apps: IAppState[]
}
