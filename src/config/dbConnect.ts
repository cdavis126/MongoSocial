import mongoose from 'mongoose';

const dbConnect = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/MongoSocial', );
        console.log('✅ Connected to MongoSocial database.');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        throw new Error('Database connection failed.');
    }
};

export default dbConnect;

