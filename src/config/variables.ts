const variables: { [key: string]: any } = {
  secret: process.env.SECRET,
  branch: process.env.BRANCH || 'main',
  pathName: process.env.PATHNAME || '/',
  folderPath: process.env.FOLDER_PATH || '',
  appName: process.env.APP_NAME || 'APP',
  serviceName: process.env.SERVICE_NAME,
  gmail: {
    name: process.env.GMAIL_NAME,
    email: process.env.GMAIL_EMAIL,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    receivers: process.env.GMAIL_RECEIVERS
  },
  deploying: false,
  pendingDeploy: false,
  deployStartTime: 0,
  deployTime: 0,
  deployError: '',
  gitLogs: '',
  yarnLogs: ''
}

export default variables
