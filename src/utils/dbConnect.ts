import mongoose from 'mongoose';

type Connection = {
    isConnected?: number;
}

const connection: Connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_DB_URI!, {});

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
