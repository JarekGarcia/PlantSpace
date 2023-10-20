import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postService } from "../services/PostService.js";

export class PostController extends BaseController {
    constructor() {
        super('api/posts')
        this.router
            .get('', this.getPosts)
            .get('/:postId', this.getPostsById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createPost)
        // .delete('/:postId', this.deletePost)
    }

    async getPosts(request, response, next) {
        try {
            const posts = await postService.getPosts()
            return response.send(posts)
        } catch (error) {
            next(error)
        }
    }

    async createPost(request, response, next) {
        try {
            const postData = request.body
            const userInfo = request.userInfo
            postData.creatorId = userInfo.id
            const post = await postService.createPost(postData)
            return response.send(post)

        } catch (error) {
            next(error)
        }
    }

    async getPostsById(request, response, next) {
        try {
            const postId = request.params.postId
            const post = await postService.getPostsById(postId)
            return response.send(post)
        } catch (error) {
            next(error)
        }
    }
}


