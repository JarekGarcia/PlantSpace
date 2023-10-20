import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentLikerService {
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
    async unlikeComment(likerId, userId) {
        const liker = await dbContext.CommentLikers.findById(likerId).populate('creator comment')
        if (!liker) {
            throw new BadRequest(`Could Not Find Liker Id: ${likerId}`)
        }
        if (liker.creatorId != userId) {
            throw new Forbidden(`You didn't like this post so you can't unlike it; no brainer`)
        }
        await liker.remove()
        // @ts-ignore
        return `${liker.creator.name} un-liked this comment.`
    }
    async getLikesByCommentId(commentId) {
        const likes = await dbContext.CommentLikers.find({ commentId: commentId }).populate('creator comment')
        return likes
    }

}

export const commentLikerService = new CommentLikerService()