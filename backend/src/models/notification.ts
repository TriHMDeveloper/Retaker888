import mongoose from 'mongoose';

interface NotificationAttrs {
    title: string;
    decription: string;
    datetime: Date;
    is_read: Boolean;
    type: string;
}

interface NotificationDoc extends mongoose.Document {
    title: string;
    decription: string;
    datetime: Date;
    is_read: Boolean;
    type: string;
}

interface NotificationModel extends mongoose.Model<NotificationDoc> {
    build(attrs: NotificationAttrs): NotificationDoc;
}

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    },
    is_read:{
        type: Boolean,
        required: true
    },
    type:{
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

notificationSchema.statics.build = (attrs: NotificationAttrs) => {
    return new Notification(attrs);
}

const Notification = mongoose.model<NotificationDoc, NotificationModel>('notifications', notificationSchema);

export { Notification };