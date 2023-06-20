import { OAuth2Client } from 'google-auth-library'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { config } from './config'

async function createTransporter() {
  if (!config.gmail) return null

  const oauth2Client = new OAuth2Client(
    config.gmail.clientID,
    config.gmail.clientSecret,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: config.gmail.refreshToken // eslint-disable-line camelcase
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.gmail.email,
      accessToken,
      clientId: config.gmail.clientID,
      clientSecret: config.gmail.clientSecret,
      refreshToken: config.gmail.refreshToken
    }
  } as any)

  return transporter
}

const transporter = createTransporter()
async function send(options: Mail.Options) {
  const emailTransporter = await transporter
  if (!config.gmail || !emailTransporter) return

  options = Object.assign(options, {
    from: {
      name: config.gmail.name,
      address: config.gmail.email
    }
  })

  return emailTransporter.sendMail(options)
}

export default send
