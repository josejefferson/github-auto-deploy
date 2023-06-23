import { NextFunction, Request, Response } from 'express'
import { log } from '../helpers/helpers'
import crypto from 'crypto'

export default function verifySecret(req: Request, res: Response, next: NextFunction) {
  log(
    'EVENT',
    `Requisição recebida da aplicação "${req.deployApp.displayName}", verificando assinatura...`
  )
  const SECRET = req.deployApp.githubWebhookSecret

  try {
    const sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8')
    const hmac = crypto.createHmac('sha256', SECRET)
    const digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
    if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
      throw new Error('Invalid signature')
    }
  } catch (err) {
    log('ERROR', 'Assinatura inválida')
    if (process.env.NODE_ENV === 'development') return next()
    return res.status(401).send('401 Unauthorized')
  }

  log('OK', 'Assinatura válida')
  return next()
}
