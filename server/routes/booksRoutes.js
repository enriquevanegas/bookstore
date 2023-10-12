import express from "express";
import { Book } from "../models/bookModels.js";


const booksRouter = express.Router();


//Root for save a new book
booksRouter.post('/', async (req, res) => {
    const { title, author, publishYear } = req.body;
    try {
        if (!title || !author || !publishYear) return res.status(400).send({ message: "All fields are required" });

        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);

        console.log('Book created successfully!');
        console.log(book);

        return res.status(201).send(`Book with the title ${title} by ${author} has been added successfully!`);
    } catch (error) {
        console.log(error.message);
        return res.status(409).send({ message: error.message });
    };
})


//Root to get all books
booksRouter.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            status: 'success',
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})


//Root to get one book by ID
booksRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) return res.status(404).json({ message: "Book Not Found!" });

        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
})


// Root to update a book
booksRouter.put("/:id", async (req, res) => {
    try {
        const { title, author, publishYear} = req.body;

        if (!title || !author || !publishYear) return res.status(400).send("All fields are required");

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) return res.status(404).json({ message: "Book Not Found!" })

        return res.status(200).send("Book has been updated!");
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});


// Root for delete a book
booksRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) return res.status(404).json({ message: "Book Not Found!" });

        return res.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});


export { booksRouter };