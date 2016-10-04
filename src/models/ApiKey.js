import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import db from '../db/db';

autoIncrement.initialize(db);

const apiKeySchema = mongoose.Schema({
	user: { type: Number, ref: 'User', required: true },
	createdDate: { type: Date, default: Date.now },
	token: { type: String, required: true, unique: true },
	lastActive: { type: Date, required: true },
	IMEI: { type: String },
	userAgent: { type: String },
	ip: { type: String }
});

apiKeySchema.plugin(autoIncrement.plugin, { model: 'ApiKey', field: 'id' });

export default const db.model('ApiKey', apiKeySchema);
