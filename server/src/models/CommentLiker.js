import { Schema } from "mongoose";

export const CommentLikerSchema = new Schema(
    {
        commentId: { type: Schema.Types.ObjectId, required: true, ref: 'Comment' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

CommentLikerSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentLikerSchema.virtual('comment', {
    localField: 'commentId',
    ref: 'Comment',
    foreignField: '_id',
    justOne: true
})