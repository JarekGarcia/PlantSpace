import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentLikerService } from "../services/CommentLikerService.js";

export class CommentLikerController extends BaseController {
    constructor() {
        super('api/CommentLikers')
        this.router
            .get('', this.getCommentLikes)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.likeComment)
            .delete('/:commentLikerId', this.unLikeComment)
    }
    async getCommentLikes(request, response, next) {
        try {
            const likes = await commentLikerService.getCommentLikes()
            return response.send(likes)
        } catch (error) {
            next(error)
        }
    }
    async likeComment(request, response, next) {
        try {
            const likerData = request.body
            const userInfo = request.userInfo
            likerData.creatorId = userInfo.id
            const liker = await commentLikerService.likeComment(likerData)
            return response.send(liker)
        } catch (error) {
            next(error)
        }
    }
    async unLikeComment(request, response, next) {
        try {
            const likerId = request.params.commentLikerId
            const userId = request.userInfo.id
            const deleteMessage = await commentLikerService.unlikeComment(likerId, userId)
            return response.send(deleteMessage)
        } catch (error) {
            next(error)
        }
    }
}