import mongoose from 'mongoose';

export default mongoose.createConnection(process.env.MONGO_URL || 'mongodb://test:test@localhost/lavvu-member-api');