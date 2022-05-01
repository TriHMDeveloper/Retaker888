import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {

    // if (!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY not defined');
    // }
    // if (!process.env.MONGO_URI) {
    //     throw new Error('MONGO_URI not defined');
    // }

    try {
        // await mongoose.connect('mongodb://localhost/Retake8888');
        await mongoose.connect('mongodb+srv://Huyxaki:xaki123@Cluster0.huvfc.mongodb.net/Retaker888?retryWrites=true&w=majority');
        console.log('MongoDB connected!');
    } catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Listening on port 3000!!!');
    })
}

start();