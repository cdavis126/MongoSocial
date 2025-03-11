import mongoose from 'mongoose';

const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/socialnetwork');
        console.log('✅ Database connected.');
        return mongoose.connection;
    } catch (error) {
        console.error('❌ Database connection error:', error);
        throw new Error('Database connection failed.');
    }
};

export default dbConnect;
