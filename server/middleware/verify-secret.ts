import crypto from 'crypto'
import { NextFunction, Request, Response } from 'express'
import { log } from '../helpers/helpers'

export default function verifySecret(req: Request, res: Response, next: NextFunction) {
  log('EVENT', 'Requisição recebida, verificando assinatura...')

  const sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8')
  const hmac = crypto.createHmac('sha256', req.deployApp.githubWebhookSecret)
  const digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    log('ERROR', 'Assinatura inválida')
    return res.status(401).send('401 Unauthorized')
  }

  log('OK', 'Assinatura válida')
  return next()
}
