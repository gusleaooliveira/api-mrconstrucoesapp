const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://gusleaooliveira:65s-xtfuDTGH-Qj@cluster0-twwyw.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "api_mrconstrucoes";
const colName = "depoimento";



app.use(bodyParser.json());

app.get('/depoimentos', (req, res, next)=>{
  async function run(){
    try{
       await client.connect();
    }catch(err){
      console.error('Erro: '+err.stack);
    }finally {
      await client.close();
    }
  }
  run().catch(console.dir);
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
  const mongoClient = new MongoClient(url);
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const p = await col.insertOne(requisicao);
       const resposta = await col.find();
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }finally {
      await client.close();
    }
  }
  run().catch(console.dir);
  mongoClient.close();
});


app.listen(process.env.PORT || 3000);
