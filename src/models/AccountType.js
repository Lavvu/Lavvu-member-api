import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import db from '../db/db';

// one of the default account types will be super-admin.

autoIncrement.initialize(db);

const accountTypeSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true }
});

accountTypeSchema.plugin(autoIncrement.plugin, { model: 'AccountType', field: 'id' });

export default db.model('AccountType', accountTypeSchema);
