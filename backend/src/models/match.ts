import mongoose from 'mongoose';

interface MatchAttrs {
    shortname1: String,
    shortname2: String,
    datetime: Date,
    status: String,
    result: String,
    ava1: String,
    ava2: String,
    name1: String,
    name2: String
}

interface MatchDoc extends mongoose.Document {
    shortname1: String,
    shortname2: String,
    datetime: Date,
    status: String,
    result: String,
    ava1: String,
    ava2: String,
    name1: String,
    name2: String
}

interface AccountModel extends mongoose.Model<MatchDoc> {
    build(attrs: MatchAttrs): MatchDoc;
}

const matchSchema = new mongoose.Schema({
    shortname1:{
        type: String,
        required: true
    },
    shortname2:{
        type: String,
        required: true
    },
    datetime:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    result:{
        type: String
    },
    ava1:{
        type: String,
        required: true
    },
    ava2:{
        type: String,
        required: true
    },
    name1:{
        type: String,
        required: true
    },
    name2:{
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

matchSchema.statics.build = (attrs: MatchAttrs) => {
    return new Match(attrs);
}

const Match = mongoose.model<MatchDoc, AccountModel>('matchs', matchSchema);

export { Match };