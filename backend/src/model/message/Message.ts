import { Document, model, Schema } from 'mongoose';
import User from '../user/User.ts';

const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: [1, 'Message must be at least 1 characters long'],
    maxLength: [500, 'Message must be at most 500 characters long'],
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

MessageSchema.set('toJSON', {
  transform(_doc, ret, _options) {
    const {  __v, ...message } = ret;
    return message;
  },
});

MessageSchema.path('user').validate({
  validator: async function (this: Document, user_id: string) {
    const user = await User.exists({ _id: user_id });
    return Boolean(user);
  },
});

const Message = model('Message', MessageSchema);
export default Message;
