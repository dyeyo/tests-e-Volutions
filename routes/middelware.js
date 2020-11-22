const jwt = require('jwt-simple')
const moment = require('moment')


const checkedToken = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.json({ error: 'Not exists token in headers' })
  }
  const token = req.headers['authorization']
  let payload = {}
  try {
    payload = jwt.decode(token, 'evolution')
  } catch (error) {
    return res.json({ error: 'Token invalid' })
  }
  if (payload.expiredAd < moment().unix()) {
    return res.json({ error: 'Token expired' })
  }

  req.userId = payload.userId
  next();
}
module.exports = { checkedToken }