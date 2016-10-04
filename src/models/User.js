import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import db from '../db/db';

autoIncrement.initialize(db);

const userSchema = mongoose.Schema({
	userName: { type: String, required: true, unique: true },
	fullName: { type: String },
	profileText: { type: String },
	email: { type: String, required: true, unique: true },
	provider: { type: String , required: true },
	providerUserId: { type: String, required: true, unique: true },
	accessToken: { type: String, required: true },
	dateJoined: { type: Date, default: Date.now }
});

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id' });

export default const db.model('User', userSchema);