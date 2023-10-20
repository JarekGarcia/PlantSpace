import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postLikerService } from "../services/PostLikerService.js";


export class PostLikerController extends BaseController {
    constructor() {
        super('api/PostLikers')
        this.router
            .get('', this.getPostLikers)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPostLiker)
            .delete('/:postLikerId', this.deletePostLike)



    }

    async getPostLikers(request, response, next) {
        try {
            const liker = await postLikerService.getPostLikers()
            return response.send(liker)
        } catch (error) {
            next(error)
        }
    }
    async createPostLiker(request, response, next) {
        try {
            const likerData = request.body
            const userInfo = request.userInfo
            likerData.creatorId = userInfo.id
            const liker = await postLikerService.createPostLiker(likerData)
            return response.send(liker)
        } catch (error) {
            next(error)
        }
    }

    async deletePostLike(request, response, next) {
        try {
            const likerId = request.params.postLikerId
            const userId = request.userInfo.id
            const deleteMessage = await postLikerService.deletePostLike(likerId, userId)
            return response.send(deleteMessage)
        } catch (error) {
            next(error)
        }
    }
}