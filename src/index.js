const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://gusleaooliveira:65s-xtfuDTGH-Qj@cluster0-twwyw.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "api_mrconstrucoes";
const colName = "depoimento";



const client = new MongoClient(url);

app.use(bodyParser.json());

app.get('/depoimentos', (req, res, next)=>{
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const resposta = await col.find().toArray();
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});




app.get('/depoimentos/nomes', (req, res, next)=>{
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const resposta = await col.distinct("nome");
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});
app.get('/depoimentos/nomes/:nome', (req, res, next)=>{
  var nome = req.params.nome;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const resposta = await col.find({"nome":  nome});
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});

app.get('/depoimentos/emails', (req, res, next)=>{
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const resposta = await col.distinct("email");
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});
app.get('/depoimentos/email/:email', (req, res, next)=>{
  var email = req.params.email;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const resposta = await col.find({"email": email});
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});


app.put('/depoimentos/:id', (req, res, next) =>{
  let id = req.params.id;
});

app.delete('/depoimentos/:id', (req, res, next) =>{
  let id = req.params.id;

});

app.post('/depoimentos', (req, res, next)=>{
  let requisicao = req.body;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colName);
       const p = await col.insertOne(requisicao);
       const resposta = await col.findOne();
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir);
});


app.listen(process.env.PORT || 3000);
