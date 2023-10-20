import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class PostService {
    async getPosts() {
        const posts = await dbContext.Post.find().populate('creator')
        return posts
    }
    async createPost(postData) {
        const post = await dbContext.Post.create(postData)
        return post
    }
    async getPostsById(postId) {
        const post = await (await dbContext.Post.findById(postId)).populate('creator')
        if (!post) {
            throw new BadRequest(`Could Not Find The Post With The Id That Was Supplied: ${postId}.`)
        }
        return post
    }

}

export const postService = new PostService()