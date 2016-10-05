import mongoose from 'mongoose';
import db from '../db/db';

const accountTypeUserSchema = mongoose.Schema({
	user: { type: Number, ref: 'User', required: true },
	accountType: { type: Number, ref: 'AccountType', required: true }
});

//unique together 
accountTypeUserSchema.index({ user: 1, accountType: 1 }, { unique: true });

export default db.model('AccountTypeUser', accountTypeUserSchema);
