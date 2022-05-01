import mongoose from 'mongoose';

interface BetAttrs {
    matchID: string;
    moneyBet: number;
    teamBet: string;
    status: string;
    accountID: string;
}

interface BetDoc extends mongoose.Document {
    matchID: string;
    moneyBet: number;
    teamBet: string;
    status: string;
    accountID: string;
}

interface BetModel extends mongoose.Model<BetDoc> {
    build(attrs: BetAttrs): BetDoc;
}

const betSchema = new mongoose.Schema({
    matchID: {
        type: String,
        required: true,
        ref : "matchs"
    },
    moneyBet: {
        type: Number,
        required: true
    },
    teamBet: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    accountID: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});


betSchema.statics.build = (attrs: BetAttrs) => {
    return new Bet(attrs);
}

const Bet = mongoose.model<BetDoc, BetModel>('bets', betSchema);

export { Bet };