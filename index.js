const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())

app.get('/', (req,res) =>{
    res.send('assignment 11 running')
})

app.listen(port,() =>{
  console.log(`server is running port ${port}`);  
})