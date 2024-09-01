import express from "express";
import { mongodbURL, PORT } from "./config";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute";
import cors from 'cors'
const app = express();
app.use(express.json())
app.use(cors());


app.get('/', (req,res) => {
    return res.status(200).send("Welcome to the home page")
})

app.use('/books',booksRoute)
mongoose.connect(mongodbURL).then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App running on port: ${PORT}`)
    });
}).catch((error) => {
    console.log('Error', error)
})