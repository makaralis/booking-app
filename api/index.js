import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB!");
    }
    catch (e) {
        throw e;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected");
});

app.get("/", (req, res) => {
    res.send("Hello first request")
});

app.listen(8800, () => {
    connect();
    console.log("Connected to backend!")
})