import mongoose from 'mongoose';
import { Password } from '../services/password';

interface AccountAttrs {
    email: string;
    password: string;
    money: number;
    role: string[];
    list_bet: string[];
    list_notice: string[];
}

interface AccountDoc extends mongoose.Document {
    email: string;
    password: string;
    money: number;
    role: string[];
    list_bet: string[];
    list_notice: string[];
}

interface AccountModel extends mongoose.Model<AccountDoc> {
    build(attrs: AccountAttrs): AccountDoc;
}

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    money: {
        type: Number,
        required: true
    },
    role:{
        type: [],
        required: true
    },
    list_bet:{
        type: [],
    },
    list_notice:[
        {
            type : String,
            ref: "notifications"
        }
    ]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

accountSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

accountSchema.statics.build = (attrs: AccountAttrs) => {
    return new Account(attrs);
}

const Account = mongoose.model<AccountDoc, AccountModel>('accounts', accountSchema);

export { Account };
