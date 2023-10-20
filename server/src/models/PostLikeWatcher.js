import { Schema } from "mongoose";

export const PostLikeWatcherSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, required: true, ref: 'Post' },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)
