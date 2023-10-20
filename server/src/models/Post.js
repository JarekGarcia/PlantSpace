import { Schema } from "mongoose";

export const PostSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 4, maxLength: 40 },
        description: { type: String, required: true, minLength: 3, maxLength: 300 },
        imgUrl: { type: String, maxLength: 400 },
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

PostSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
