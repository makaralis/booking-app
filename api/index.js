import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

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

app.use(express.json());

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.listen(8800, () => {
    connect();
    console.log("Connected to backend!")
})