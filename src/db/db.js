import mongoose from 'mongoose';

export default const mongoose.createConnection(process.env.MONGO_URL || 'mongodb://test:test@localhost/lavvu-member-api');