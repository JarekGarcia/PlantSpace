import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";
import { commentLikerService } from "../services/CommentLikerService.js";

export class CommentController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            // .get('', this.getComments)
            .get('/:commentId', this.getCommentById)
            .get('/:commentId/CommentLikers', this.getLikesByCommentId)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.deleteComment)
    }

    // async getComments(request, response, next) {
    //     try {
    //         const comments = await commentService.getComments()
    //         return response.send(comments)

    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async createComment(request, response, next) {
        try {
            const commentData = request.body
            const userInfo = request.userInfo
            commentData.creatorId = userInfo.id
            const comment = await commentService.createComments(commentData)
            return response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async getCommentById(request, response, next) {
        try {
            const commentId = request.params.commentId
            const comment = await commentService.getCommentsById(commentId)
            return response.send(comment)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const message = await commentService.deleteComment(commentId, userId)
            return response.send(message)
        } catch (error) {
            next(error)
        }
    }

    async getLikesByCommentId(request, response, next) {
        try {
            const commentId = request.params.commentId
            const likes = await commentLikerService.getLikesByCommentId(commentId)
            return response.send(likes)
        } catch (error) {
            next(error)
        }
    }

}