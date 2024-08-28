var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { mongodbURL, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    //console.log(req);
    return res.status(200).send("Welcome to the home page");
});
app.post('/book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = yield Book.create(newBook);
        return res.status(400).send(book);
    }
    catch (error) {
        console.log('Port error', error);
        res.status(500).send({ message: error.message });
    }
}));
mongoose.connect(mongodbURL).then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
        console.log(`App running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log('Error', error);
});
