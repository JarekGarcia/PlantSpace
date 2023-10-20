import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentService {
    async createComments(commentData) {
        const comment = await dbContext.Comments.create(commentData)
        return comment
    }
    // async getComments() {
    //     const comments = await dbContext.Comments.find().populate('post creator')
    //     return comments
    // }
    async getCommentsById(commentId) {
        const comment = (await dbContext.Comments.findById(commentId)).populate('creator post')
        if (!comment) {
            throw new BadRequest(`Could Not Find Comment With ID that Was Supplied: ${commentId}`)
        }
        return comment
    }
    async getCommentsByPostId(postId) {
        const comments = await dbContext.Comments.find({ postId: postId }).populate('creator post')
        return comments
    }
    async deleteComment(commentId, userId) {
        const deletedComment = await this.getCommentsById(commentId)
        if (userId != deletedComment.creatorId.toString()) {
            throw new Forbidden('Not Your Comment To Delete!')
        }
        await deletedComment.remove()
        return `This Comment Has Been Deleted ${deletedComment.body}`
    }

}

export const commentService = new CommentService()