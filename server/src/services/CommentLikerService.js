import { dbContext } from "../db/DbContext.js"

class CommentLikerService {
    unlikeComment(likerId, userId) {
        throw new Error("Method not implemented.")
    }
    async getCommentLikes() {
        const likes = await dbContext.CommentLikers.find().populate('creator comment')
        return likes
    }
    async likeComment(likerData) {
        const liker = await dbContext.CommentLikers.create(likerData)
        await liker.populate('creator')
        await liker.populate('comment')
        return liker
    }

}

export const commentLikerService = new CommentLikerService()