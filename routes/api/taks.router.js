const router = require('express').Router()
const { Task } = require('../../db')
const jwt = require('jwt-simple');
const middelware = require('../middelware');
let payload = {}

router.get('/', async (req, res) => {
  // let payload = {}
  // const token = req.headers['authorization'];
  // payload = jwt.decode(token, 'evolution')
  // req.userId = payload.userId
  // console.log(req.userId);

  const tasks = await Task.findAll();
  res.json(tasks)
})

router.post('/', async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task)
})

router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  const task = await Task.findOne({
    where: { id: req.params.id }
  });
  res.json(task)
})

router.put('/:id', async (req, res) => {
  await Task.update(req.body, {
    where: { id: req.params.id }
  });
  res.json({ success: "Se modifico con exito" })
})

router.delete('/:id', async (req, res) => {
  await Task.destroy({
    where: { id: req.params.id }
  });
  res.json({ success: "Se elimino con exito" })
})

module.exports = router