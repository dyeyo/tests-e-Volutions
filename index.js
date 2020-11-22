const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api')
const app = express();
const cors = require('cors')

require('./db')
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.listen(3000, () => {
  console.log('Server run');
})