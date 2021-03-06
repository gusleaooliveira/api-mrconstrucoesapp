const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const url =
  "mongodb+srv://gusleaooliveira:65s-xtfuDTGH-Qj@cluster0-twwyw.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
const dbName = "api_mrconstrucoes";
const colName = "depoimento";

const colImage = "imagem";

const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());

app.post("/imagens", (req, res, next) => {
  let requisicao = req.body;  
  console.error('------------------------------------');
  console.error('Requisição: {'+JSON.stringify(requisicao)+'}');
  console.error('------------------------------------');
   

  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const p = await col.insertOne(requisicao);
      res.sendStatus(200);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.post("/imagens", (req, res, next) => {
  let requisicao = req.body;  
  console.log(requisicao);
  
  
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const p = await col.insertOne(requisicao);
      res.send(p);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});



app.put("/imagens", (req, res, next) => {
  let requisicao = req.body;
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const pre = await col
        .find({ _id: ObjectId(String(requisicao._id)) })
        .toArray();
      const resposta = await col.replaceOne(pre[0], {
        tamanho: requisicao.tamanho,
        imagem: requisicao.imagem,
      });
      res.sendStatus(200);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.delete("/imagens/:id", (req, res, next) => {
  let requisicao = req.params.id;
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const pre = await col
        .find({ _id: ObjectId(String(requisicao)) })
        .toArray();
      const resposta = await col.deleteOne(pre[0]);
      res.sendStatus(200);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/imagens", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const resposta = await col.find({}).toArray();
      res.send(resposta);
    } catch (err) {
      console.log("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/imagens/minimo", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const resposta = await col.find({ tamanho: "minimo" }).toArray();
      console.log(resposta);
      res.send(resposta);
    } catch (err) {
      console.log("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/imagens/pequeno", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const resposta = await col.find({ tamanho: "pequeno" }).toArray();
      console.log(resposta);
      res.send(resposta);
    } catch (err) {
      console.log("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/imagens/medio", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const resposta = await col.find({ tamanho: "medio" }).toArray();
      res.send(resposta);
    } catch (err) {
      console.log("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/imagens/grande", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colImage);
      const resposta = await col.find({ tamanho: "grande" }).toArray();
      res.send(resposta);
    } catch (err) {
      console.log("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

//--------------------------------------------------------------------------------------------------------------------------------

app.get("/depoimentos", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const resposta = await col.find().toArray();
      res.send(resposta);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/depoimentos/nomes", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const resposta = await col.distinct("nome");
      res.send(resposta);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});
app.get("/depoimentos/nomes/:nome", (req, res, next) => {
  var nome = req.params.nome;
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const resposta = await col.find({ nome: nome });
      res.send(resposta);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.get("/depoimentos/emails", (req, res, next) => {
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const resposta = await col.distinct("email");
      res.send(resposta);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});
app.get("/depoimentos/emails/:email", (req, res, next) => {
  var email = req.params.email;
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const resposta = await col.find({ email: email });
      res.send(resposta);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.put("/depoimentos/:id", (req, res, next) => {
  let id = req.params.id;
});

app.delete("/depoimentos/:id", (req, res, next) => {
  let id = req.params.id;
});

app.post("/depoimentos", (req, res, next) => {
  let requisicao = req.body;
  async function run() {
    try {
      await client.connect();
      const db = client.db(dbName);
      const col = db.collection(colName);
      const p = await col.insertOne(requisicao);
      res.sendStatus(200);
    } catch (err) {
      console.error("Erro: " + err.stack);
    }
  }
  run().catch(console.dir);
});

app.listen(process.env.PORT || 3000);
