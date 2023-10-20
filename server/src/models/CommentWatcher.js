import { Schema } from "mongoose";

export const CommentWatcherSchema = new Schema(
    {
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        commentId: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentWatcherSchema.virtual('profile', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentWatcherSchema.virtual('comment', {
    localField: 'commentId',
    ref: 'Comment',
    foreignField: '_id',
    justOne: true
})