const router = require('express').Router()
const { User } = require('../../db')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const moment = require('moment')
const jwt = require('jwt-simple')

router.post('/register', [
  check('name', 'El nombre de usuario es obligatorio').not().isEmpty(),
  check('email', 'El email de usuario es obligatorio').not().isEmpty(),
  check('email', 'El email no es valido').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errores: errors.array() })
  }
  req.body.password = bcrypt.hashSync(req.body.password, 10)
  const user = await User.create(req.body);
  res.json(user)
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } })
  if (user) {
    const passIguales = bcrypt.compareSync(req.body.password, user.password)
    if (passIguales) {
      res.json({ status: 200, success: createToken(user) })
    } else {
      res.json({ error: 'Datos invalidos' })
    }
  } else {
    res.json({ error: 'Datos invalidos' })
  }
})

const createToken = (user) => {
  const payload = {
    userId: user.id,
    name: user.name,
    createdAt: moment().unix(),
    expiresAt: moment().add(5, 'minutes').unix(),
  }
  return jwt.encode(payload, 'evolution')
}

module.exports = router