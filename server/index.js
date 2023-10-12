import express from "express";
import { PORT, DBURL } from "./config.js";
import mongoose from "mongoose";
import { booksRouter } from "./routes/booksRoutes.js";
import cors from "cors";


const app = express();


/**
 * Middleware 
 */
// For parsing request body
app.use(express.json());

// For CORS policy
app.use(
    cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "DELETE"],
        allowedHeaders: ['Content-Type']
    })
);


// App root
app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send("Alive in root");
});


// Routes for books
app.use("/books", booksRouter);


// Database conection
mongoose
    .connect(DBURL)
    .then(() => {
        console.log("App connected to the Data Base");
        app.listen(PORT, () => console.log("IT'S ALIVE!"));
    })
    .catch((error) => console.log(error))