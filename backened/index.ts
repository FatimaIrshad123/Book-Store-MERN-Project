import express from "express";
import { mongodbURL, PORT } from "./config";
import mongoose from "mongoose";
import { Book } from "./models/bookModels";

const app = express();
app.use(express.json())

app.get('/', (req,res) => {
    //console.log(req);
    return res.status(200).send("Welcome to the home page")
})

app.post('/book', async(req,res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook)
        return res.status(400).send(book)

    }catch(error: any){
        console.log('Port error', error)
        res.status(500).send({message: error.message})
    }
})

app.get('/books', async(req,res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        })
    }catch (error: any) {
        console.log(error);
        return res.status(500).send({message: error.message})
    }
})

app.get('/books/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book)
    }catch (error: any) {
        console.log(error);
        return res.status(500).send({message: error.message})
    }
})

app.put('/book/:id', async(req,res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result){
            return res.status(404).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book updated successfully'})
    }catch(error: any){
        return res.status(500).send({message: error.message})

    }
})
mongoose.connect(mongodbURL).then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App running on port: ${PORT}`)
    });
}).catch((error) => {
    console.log('Error', error)
})