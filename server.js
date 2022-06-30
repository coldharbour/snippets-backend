const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

const categoryCollection = require('./models/categories')

const port = 8081;
const app = express();

app.use(cors());
app.use(express.json());

//ENV variables for mongo connection auth
const mongoDbData = {
    mongoUser: process.env.DB_USER,
    mongoPassword: process.env.DB_PASSWORD,
    mongoCluster: process.env.DB_CLUSTER,
    mongoDatabase: process.env.DB_NAME
}


app.post('/targetCategory', async (req, res) => {
    const categoryName = req.body.category
    categoryName
    categoryCollection.findOne({ category: `${categoryName}` }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
            console.log(categoryName)
        }
    })
})

app.get('/', (req, res) => {
    res.send('<h1>its not working for now</h1>')
})



//connect to our mongoDB with mongoose and env varaibles
//server port listener
//server only starts if connection to mongoDB is successful
mongoose.connect(`mongodb+srv://snippetsAdmin:fY0k4SDpDGVaJzDw@snippetscluster.0evbt.mongodb.net/snippetsDB?retryWrites=true&w=majority`)
    // (`mongodb+srv://${mongoDbData.mongoUser}:${mongoDbData.mongoPassword}@${mongoDbData.mongoCluster}.0evbt.mongodb.net/${mongoDbData.mongoDatabase}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Successful connection to database')
        app.listen(port, function (err) {
            if (err) console.log("Error in server setup")
            console.log(`Server listening on Port ${port}`);
        })
    }).catch(err => {
        console.log(err)
    })

