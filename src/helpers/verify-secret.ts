const SECRET = process.env.SECRET

const crypto = require('crypto')
export default function verifySecret(req, res, next) {
  console.log('[EVENT] Requisição recebida, verificando assinatura...')

  const sig = Buffer.from(req.get('X-Hub-Signature-256') || '', 'utf8')
  const hmac = crypto.createHmac('sha256', SECRET)
  const digest = Buffer.from('sha256=' + hmac.update(req.rawBody).digest('hex'), 'utf8')
  if (sig.length !== digest.length || !crypto.timingSafeEqual(digest, sig)) {
    console.log('[ERROR] Assinatura inválida')
    return res.status(401).send('401 Unauthorized')
  }

  console.log('[SUCCESS] Assinatura válida')
  return next()
}

module.exports = verifySecret
