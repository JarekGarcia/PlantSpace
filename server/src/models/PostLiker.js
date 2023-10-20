import { Schema } from "mongoose";

export const PostLikerSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

PostLikerSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

PostLikerSchema.virtual('post', {
    localField: 'postId',
    foreignField: '_id',
    justOne: true,
    ref: 'Post'
})

PostLikerSchema.index({ postId: 1, creatorId: 1 }, { unique: true })