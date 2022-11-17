import { OAuth2Client } from 'google-auth-library'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import variables from './variables'

async function createTransporter() {
  const oauth2Client = new OAuth2Client(
    variables.gmail.clientId,
    variables.gmail.clientSecret,
    'https://developers.google.com/oauthplayground'
  )

  oauth2Client.setCredentials({
    refresh_token: variables.gmail.refreshToken // eslint-disable-line camelcase
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
      user: variables.gmail.email,
      accessToken,
      clientId: variables.gmail.clientId,
      clientSecret: variables.gmail.clientSecret,
      refreshToken: variables.gmail.refreshToken
    }
  } as any)

  return transporter
}

const transporter = createTransporter()
async function send(options: Mail.Options) {
  const emailTransporter = await transporter
  options = Object.assign(options, {
    from: {
      name: variables.gmail.name || 'Sistema de deploy automático via GitHub',
      address: variables.gmail.email
    }
  })

  return emailTransporter.sendMail(options)
}

export default send
