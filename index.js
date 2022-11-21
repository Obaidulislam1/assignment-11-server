const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ub5swj4.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
    res.send('assignment 11 running')
})


app.listen(port, () => {
    console.log(`server is running port ${port}`);
})

async function run() {
    try {
        const vegetableCollection = client.db('assignment-11').collection('vegetable');
        app.get('/vegetable', async(req,res) =>{
          const query = {}
          const cursor = vegetableCollection.find(query);
          const vegetables = await cursor.limit(3).toArray();
          res.send(vegetables);
        })

        app.get('/vegetables', async(req,res) =>{
            const query = {}
            const cursor = vegetableCollection.find(query);
            const vegetables = await cursor.toArray();
          res.send(vegetables);
        })

        app.get('/vegetables/:id', async(req,res) =>{
           const id = req.params.id;
           const query = {_id: ObjectId(id)}
           const vegetable = await vegetableCollection.find(query)
           res.send(vegetable)
        })
    }
    finally {

    }
}
run().catch(console.dir)