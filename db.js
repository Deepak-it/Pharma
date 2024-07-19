// db.js
const { MongoClient } = require('mongodb');

const MONGO_DB_URI = 'mongodb+srv://deepakit03:12341234@cluster0.kyeygzd.mongodb.net/pharma';

let db;

const connectToDb = async () => {
    if (db) return db;
    try {
        const client = new MongoClient(MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
            connectTimeoutMS: 30000,
        });
        await client.connect();
        db = client.db('pharma');
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        throw error;
    }
};

module.exports = connectToDb;
