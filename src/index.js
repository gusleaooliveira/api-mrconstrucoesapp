const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const knex = require('knex')({
  client: mysql,
  connection: {
    host: 'ec2-34-202-88-122.compute-1.amazonaws.com',
    user: 'df7fee437l9ba2',
    password: 'ufttvdhihietlc',
    database: 'id13817019_mrconstrucoes_api'
  }
});


app.use(bodyParser.json());

app.get('/depoimentos', (req, res, next)=>{

});

app.get('/depoimentos/:id', (req, res, next) =>{
  let id = req.params.id;

});

app.put('/depoimentos/:id', (req, res, next) =>{
  let id = req.params.id;
});

app.delete('/depoimentos/:id', (req, res, next) =>{
  let id = req.params.id;
});

app.post('/depoimentos', (req, res, next)=>{
  let requisicao = req.body;
});


app.listen(process.env.PORT || 3000);
