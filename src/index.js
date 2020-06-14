const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb+srv://gusleaooliveira:65s-xtfuDTGH-Qj@cluster0-twwyw.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "api_mrconstrucoes";
const colName = "depoimento";

const colImage = "imagem";

const client = new MongoClient(url);

app.use(bodyParser.json());

app.post('/imagens', (req, res, next)=>{
  let requisicao = req.body;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colImage);
       const p = await col.insertOne(requisicao);
       const resposta = await col.findOne();
       res.send(resposta);
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir); 
});


app.put('/imagens', (req, res, next)=>{
  let requisicao = req.body;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colImage);
       const pre = await col.find({"_id": ObjectId(String(requisicao._id))}).toArray();
       const resposta = await col.replaceOne(pre[0], {"tamanho": requisicao.tamanho, "imagem": requisicao.imagem});
       console.log(resposta);
       res.send(resposta);       
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir); 
});


app.delete('/imagens/:id', (req, res, next)=>{
  let requisicao = req.params.id;
  async function run(){
    try{
       await client.connect();
       const db = client.db(dbName);
       const col =  db.collection(colImage);
       const pre = await col.find({"_id": ObjectId(String(requisicao))}).toArray();
       const resposta = await col.deleteOne(pre[0]);
       console.log(resposta);
       res.send(resposta);       
    }catch(err){
      console.error('Erro: '+err.stack);
    }
  }
  run().catch(console.dir); 
});

app.get('/imagens/pequeno', (req, res, next) => {
   async function run(){
       try{
           await client.connect();
           const db = client.db(dbName);
           const col = db.collection(colImage);
           const resposta = await col.find({"tamanho": "pequeno"}).toArray();
           console.log(resposta);
           res.send(resposta);
       }catch(err){
           console.log('Erro: '+err.stack);
       }
   } 
   run().catch(console.dir);
});



app.get('/imagens/medio', (req, res, next) => {
   async function run(){
       try{
           await client.connect();
           const db = client.db(dbName);
           const col = db.collection(colImage);
           const resposta = await col.find({"tamanho": "medio"}).toArray();
           res.send(resposta);
       }catch(err){
           console.log('Erro: '+err.stack);
       }
   } 
   run().catch(console.dir);
});

app.get('/imagens/grande', (req, res, next) => {
   async function run(){
       try{
           await client.connect();
           const db = client.db(dbName);
           const col = db.collection(colImage);
           const resposta = await col.find({"tamanho": "grande"}).toArray();
           res.send(resposta);
       }catch(err){
           console.log('Erro: '+err.stack);
       }
   } 
   run().catch(console.dir);
});


//--------------------------------------------------------------------------------------------------------------------------------

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
app.get('/depoimentos/emails/:email', (req, res, next)=>{
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
